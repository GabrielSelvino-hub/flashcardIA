// Serviço WebAuthn / Passkeys para autenticação com biometria
// Permite autenticação forte usando biometria do dispositivo (FaceID, TouchID, etc.)

// Verificar se WebAuthn está disponível
function isAvailable() {
  return typeof window !== 'undefined' && 
         window.PublicKeyCredential !== undefined &&
         typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function';
}

// Verificar se autenticador de plataforma (biometria) está disponível
async function isPlatformAuthenticatorAvailable() {
  if (!isAvailable()) {
    return false;
  }

  try {
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch (error) {
    console.error('Erro ao verificar autenticador de plataforma:', error);
    return false;
  }
}

// Gerar challenge aleatório
function generateChallenge() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => String.fromCharCode(byte)).join('');
}

// Converter string para base64url
function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Converter base64url para ArrayBuffer
function base64UrlDecode(str) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Converter ArrayBuffer para base64url
function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  const binary = String.fromCharCode(...bytes);
  return base64UrlEncode(binary);
}

// Registrar nova credencial (passkey)
async function register(userId, userName, userDisplayName) {
  if (!isAvailable()) {
    return {
      success: false,
      error: 'WebAuthn não está disponível neste navegador'
    };
  }

  const platformAvailable = await isPlatformAuthenticatorAvailable();
  if (!platformAvailable) {
    return {
      success: false,
      error: 'Autenticador de plataforma (biometria) não está disponível'
    };
  }

  try {
    const challenge = generateChallenge();
    const userIdBuffer = new TextEncoder().encode(userId);

    const publicKeyCredentialCreationOptions = {
      challenge: new TextEncoder().encode(challenge),
      rp: {
        name: 'NihonGo Deck',
        id: window.location.hostname
      },
      user: {
        id: userIdBuffer,
        name: userName,
        displayName: userDisplayName || userName
      },
      pubKeyCredParams: [
        { alg: -7, type: 'public-key' }, // ES256
        { alg: -257, type: 'public-key' } // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform', // Força uso de autenticador de plataforma (biometria)
        userVerification: 'required',
        requireResidentKey: false
      },
      timeout: 60000,
      attestation: 'none'
    };

    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });

    if (!credential) {
      return {
        success: false,
        error: 'Falha ao criar credencial'
      };
    }

    const response = credential.response;
    const credentialId = arrayBufferToBase64Url(credential.rawId);
    const publicKey = arrayBufferToBase64Url(response.getPublicKey());
    const clientDataJSON = arrayBufferToBase64Url(response.clientDataJSON);
    const attestationObject = arrayBufferToBase64Url(response.attestationObject);

    // Salvar credencial localmente (em produção, enviar para servidor)
    const credentialData = {
      id: credentialId,
      publicKey,
      clientDataJSON,
      attestationObject,
      userId,
      registeredAt: new Date().toISOString()
    };

    // Salvar no localStorage (em produção, enviar para servidor)
    const savedCredentials = JSON.parse(localStorage.getItem('webauthn_credentials') || '[]');
    savedCredentials.push(credentialData);
    localStorage.setItem('webauthn_credentials', JSON.stringify(savedCredentials));

    return {
      success: true,
      credentialId,
      credential: credentialData
    };
  } catch (error) {
    console.error('Erro ao registrar passkey:', error);
    
    let errorMessage = 'Erro ao registrar passkey';
    if (error.name === 'NotAllowedError') {
      errorMessage = 'Operação cancelada pelo usuário ou autenticador não disponível';
    } else if (error.name === 'InvalidStateError') {
      errorMessage = 'Credencial já existe para este usuário';
    } else if (error.name === 'NotSupportedError') {
      errorMessage = 'WebAuthn não é suportado neste dispositivo';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

// Autenticar com passkey existente
async function authenticate(userId = null) {
  if (!isAvailable()) {
    return {
      success: false,
      error: 'WebAuthn não está disponível neste navegador'
    };
  }

  try {
    // Buscar credenciais salvas (em produção, buscar do servidor)
    const savedCredentials = JSON.parse(localStorage.getItem('webauthn_credentials') || '[]');
    
    if (savedCredentials.length === 0) {
      return {
        success: false,
        error: 'Nenhuma passkey registrada. Registre uma passkey primeiro.'
      };
    }

    // Filtrar por userId se fornecido
    const userCredentials = userId 
      ? savedCredentials.filter(c => c.userId === userId)
      : savedCredentials;

    if (userCredentials.length === 0) {
      return {
        success: false,
        error: 'Nenhuma passkey encontrada para este usuário'
      };
    }

    const challenge = generateChallenge();
    const allowCredentials = userCredentials.map(cred => ({
      id: base64UrlDecode(cred.id),
      type: 'public-key',
      transports: ['internal'] // Autenticador de plataforma
    }));

    const publicKeyCredentialRequestOptions = {
      challenge: new TextEncoder().encode(challenge),
      allowCredentials: allowCredentials,
      userVerification: 'required',
      timeout: 60000
    };

    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
    });

    if (!assertion) {
      return {
        success: false,
        error: 'Falha na autenticação'
      };
    }

    const response = assertion.response;
    const credentialId = arrayBufferToBase64Url(assertion.rawId);
    const clientDataJSON = arrayBufferToBase64Url(response.clientDataJSON);
    const authenticatorData = arrayBufferToBase64Url(response.authenticatorData);
    const signature = arrayBufferToBase64Url(response.signature);
    const userHandle = response.userHandle ? arrayBufferToBase64Url(response.userHandle) : null;

    // Encontrar credencial correspondente
    const credential = userCredentials.find(c => c.id === credentialId);
    if (!credential) {
      return {
        success: false,
        error: 'Credencial não encontrada'
      };
    }

    // Em produção, validar a assinatura no servidor
    // Por enquanto, apenas retornar sucesso se a credencial existe

    return {
      success: true,
      userId: credential.userId,
      credentialId,
      authenticatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro ao autenticar com passkey:', error);
    
    let errorMessage = 'Erro ao autenticar';
    if (error.name === 'NotAllowedError') {
      errorMessage = 'Autenticação cancelada pelo usuário ou falhou';
    } else if (error.name === 'InvalidStateError') {
      errorMessage = 'Credencial inválida ou não encontrada';
    } else if (error.name === 'NotSupportedError') {
      errorMessage = 'WebAuthn não é suportado neste dispositivo';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

// Verificar se usuário tem passkey registrada
function hasPasskey(userId = null) {
  const savedCredentials = JSON.parse(localStorage.getItem('webauthn_credentials') || '[]');
  
  if (userId) {
    return savedCredentials.some(c => c.userId === userId);
  }
  
  return savedCredentials.length > 0;
}

// Remover passkey
function removePasskey(credentialId) {
  const savedCredentials = JSON.parse(localStorage.getItem('webauthn_credentials') || '[]');
  const filtered = savedCredentials.filter(c => c.id !== credentialId);
  localStorage.setItem('webauthn_credentials', JSON.stringify(filtered));
  return filtered.length < savedCredentials.length;
}

// Listar todas as passkeys
function listPasskeys() {
  return JSON.parse(localStorage.getItem('webauthn_credentials') || '[]');
}

// Limpar todas as passkeys
function clearAllPasskeys() {
  localStorage.removeItem('webauthn_credentials');
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.webauthnService = {
    isAvailable,
    isPlatformAuthenticatorAvailable,
    register,
    authenticate,
    hasPasskey,
    removePasskey,
    listPasskeys,
    clearAllPasskeys
  };
}
