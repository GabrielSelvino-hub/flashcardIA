// JSONBin.io Service Module
// Serviço para comunicação com a API do JSONBin.io

const JSONBIN_API_BASE = 'https://api.jsonbin.io/v3/b';

// Master Key padrão para todos os usuários
// ATENÇÃO: Esta chave será visível no código-fonte. Use uma chave dedicada apenas para esta aplicação.
const DEFAULT_MASTER_KEY = '$2a$10$7X2XacpWyeo/Ui/pjevyOuEF9q07kF386hQPD9ImDbhAJvkrjQbwe'; // Master Key do JSONBin.io - Flashcard

// Access Key ID (opcional, pode ser usado para leitura)
const ACCESS_KEY_ID = '69482d3dae596e708fa8d8e8';

// Bin ID fixo compartilhado - Use um dos bins que você já criou
// IMPORTANTE: Use o mesmo Bin ID em todos os dispositivos (PC e celular) para sincronização funcionar
// Use um dos seus bins existentes. Exemplos dos que você criou:
// - '6948372ed0ea881f40384180' (criado às 18:06)
// - '694836ee43b1c97be9fd27f1' (criado às 18:05)
// - '694836c543b1c97be9fd27b3' (criado às 18:04)
// Escolha um e cole aqui. Se deixar null, criará um novo (não recomendado para sincronização)
const FIXED_SHARED_BIN_ID = '69483c8dd0ea881f403849c0'; // Bin ID fixo - sempre usa este bin

// Função para obter o Bin ID compartilhado (usa fixo ou cria se não existir)
async function getSharedBinId(masterKey) {
  const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
  
  if (!keyToUse || keyToUse === 'SUA_MASTER_KEY_AQUI') {
    console.error('Master Key não configurada');
    return null;
  }

  // SEMPRE usa o Bin ID fixo se estiver configurado (não cria novos bins)
  if (FIXED_SHARED_BIN_ID && FIXED_SHARED_BIN_ID.trim()) {
    const fixedBinId = FIXED_SHARED_BIN_ID.trim();
    
    // Verifica se o bin existe e é acessível
    try {
      const response = await fetch(`${JSONBIN_API_BASE}/${fixedBinId}/latest`, {
        method: 'GET',
        headers: { 'X-Master-Key': keyToUse.trim() }
      });
      
      if (response.ok) {
        console.log('✅ Usando Bin ID fixo:', fixedBinId);
        return fixedBinId;
      } else {
        // Se o bin não existe ou não é acessível, retorna erro em vez de criar novo
        console.error('❌ Bin ID fixo não encontrado ou sem acesso:', fixedBinId, 'Status:', response.status);
        const result = await response.json().catch(() => ({}));
        console.error('Detalhes do erro:', result);
        return null; // Retorna null para que a função chamadora possa tratar o erro
      }
    } catch (e) {
      console.error('Erro ao verificar bin fixo:', e);
      return null;
    }
  }
  
  // Se não há Bin ID fixo configurado, retorna null (não cria novos bins automaticamente)
  console.error('⚠️ FIXED_SHARED_BIN_ID não está configurado! Configure um Bin ID fixo no código.');
  return null;
}

/**
 * Valida o formato de um Bin ID
 * @param {string} binId - O Bin ID a ser validado
 * @returns {boolean} - true se válido, false caso contrário
 */
function validateBinId(binId) {
  if (!binId || typeof binId !== 'string') {
    return false;
  }
  
  const trimmed = binId.trim();
  
  // Bin IDs do JSONBin.io têm formato específico: geralmente são strings alfanuméricas
  // com comprimento mínimo de 20 caracteres (mas pode variar)
  // Aceita qualquer string não vazia com pelo menos 10 caracteres
  if (trimmed.length < 10) {
    return false;
  }
  
  // Remove espaços e caracteres especiais que não são válidos
  // Bin IDs geralmente são alfanuméricos, mas podem ter hífens
  const validPattern = /^[a-zA-Z0-9\-_]+$/;
  return validPattern.test(trimmed);
}

/**
 * Verifica se um Bin ID existe e é acessível
 * @param {string} binId - O Bin ID a ser verificado
 * @param {string} masterKey - Master Key (opcional)
 * @returns {Promise<{success: boolean, exists?: boolean, error?: string}>}
 */
async function verifyBinId(binId, masterKey) {
  try {
    if (!validateBinId(binId)) {
      return { success: false, exists: false, error: 'Formato de Bin ID inválido. O Bin ID deve ter pelo menos 10 caracteres alfanuméricos.' };
    }

    const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
    
    if (!keyToUse || keyToUse === 'SUA_MASTER_KEY_AQUI') {
      return { success: false, exists: false, error: 'Master Key não configurada.' };
    }

    // Tenta buscar o bin para verificar se existe
    const response = await fetch(`${JSONBIN_API_BASE}/${binId}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': keyToUse.trim()
      }
    });

    const result = await response.json();

    if (response.status === 404) {
      return { success: true, exists: false, error: 'Bin ID não encontrado. Verifique se o Bin ID está correto ou crie um novo bin.' };
    }
    
    if (response.status === 401 || response.status === 403) {
      return { success: true, exists: false, error: 'Sem permissão para acessar este Bin ID. Verifique se o Bin ID pertence à sua conta.' };
    }

    if (!response.ok) {
      const errorMsg = result.message || `Erro HTTP ${response.status}`;
      return { success: false, exists: false, error: errorMsg };
    }

    // Bin existe e é acessível
    return { success: true, exists: true };
  } catch (error) {
    return { 
      success: false, 
      exists: false, 
      error: error.message || 'Erro ao verificar Bin ID. Verifique sua conexão.' 
    };
  }
}

/**
 * Cria um novo bin privado no JSONBin.io
 * @param {string} masterKey - Master Key do JSONBin.io (opcional, usa DEFAULT_MASTER_KEY se não fornecido)
 * @param {object} data - Dados a serem armazenados
 * @returns {Promise<{success: boolean, binId?: string, error?: string}>}
 */
async function createBin(masterKey, data) {
  try {
    const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
    
    if (!keyToUse || keyToUse === 'SUA_MASTER_KEY_AQUI') {
      return { success: false, error: 'Master Key não configurada. Configure DEFAULT_MASTER_KEY no código.' };
    }

    // Valida se os dados são válidos
    if (!data || typeof data !== 'object') {
      return { success: false, error: 'Dados inválidos para criar o bin.' };
    }

    // Garante que o body é um JSON válido
    let jsonBody;
    try {
      jsonBody = JSON.stringify(data);
    } catch (e) {
      return { success: false, error: `Erro ao serializar dados: ${e.message}` };
    }

    const response = await fetch(JSONBIN_API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': keyToUse.trim(),
        'X-Bin-Private': 'true'
      },
      body: jsonBody
    });

    const result = await response.json();

    if (!response.ok) {
      let errorMsg = result.message || `Erro HTTP ${response.status}`;
      
      // Melhora mensagens de erro específicas
      if (response.status === 401 || response.status === 403) {
        errorMsg = 'Master Key inválida ou sem permissão para criar bins. Verifique se a Master Key está correta e tem permissões adequadas.';
      } else if (response.status === 400) {
        errorMsg = `Dados inválidos: ${result.message || 'Verifique o formato dos dados sendo enviados.'}`;
      } else if (result.message && result.message.includes('Invalid')) {
        errorMsg = `Erro na requisição: ${result.message}. Verifique a Master Key e os dados.`;
      }
      
      return { success: false, error: errorMsg };
    }

    if (result.metadata && result.metadata.id) {
      return { success: true, binId: result.metadata.id };
    }

    return { success: false, error: 'Bin criado mas ID não retornado pela API' };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Erro ao criar bin. Verifique sua conexão.' 
    };
  }
}

/**
 * Atualiza dados de um usuário específico no bin compartilhado
 * @param {string} userBinId - ID do usuário (identificador dentro do bin compartilhado)
 * @param {string} masterKey - Master Key do JSONBin.io (opcional, usa DEFAULT_MASTER_KEY se não fornecido)
 * @param {object} userData - Dados do usuário a serem salvos
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function updateUserData(userBinId, masterKey, userData) {
  try {
    if (!userBinId || typeof userBinId !== 'string' || userBinId.trim().length === 0) {
      return { success: false, error: 'ID do usuário inválido' };
    }

    const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
    
    if (!keyToUse || keyToUse === 'SUA_MASTER_KEY_AQUI') {
      return { success: false, error: 'Master Key não configurada. Configure DEFAULT_MASTER_KEY no código.' };
    }

    // Primeiro, busca o bin compartilhado completo
    console.log('Atualizando dados do usuário:', userBinId);
    const getResult = await getSharedBin(masterKey);
    if (!getResult.success) {
      console.error('Erro ao buscar bin compartilhado:', getResult.error);
      return { success: false, error: `Erro ao buscar banco de dados: ${getResult.error}` };
    }

    // Atualiza os dados do usuário específico
    const allUsersData = getResult.data || {};
    console.log('Dados atuais no bin (antes de atualizar):', Object.keys(allUsersData));
    
    allUsersData[userBinId] = {
      ...userData,
      lastSync: new Date().toISOString()
    };
    
    console.log('Salvando dados do usuário:', {
      userId: userBinId,
      decksCount: userData.decks ? userData.decks.length : 0,
      tagsCount: userData.tags ? userData.tags.length : 0,
      totalUsersInBin: Object.keys(allUsersData).length
    });

    // Obtém o ID do bin compartilhado
    const sharedBinId = await getSharedBinId(masterKey);
    if (!sharedBinId) {
      console.error('Não foi possível obter o bin compartilhado');
      return { success: false, error: 'Não foi possível obter ou criar o bin compartilhado.' };
    }

    console.log('Atualizando bin compartilhado:', sharedBinId);
    
    // Atualiza o bin compartilhado
    const response = await fetch(`${JSONBIN_API_BASE}/${sharedBinId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': keyToUse.trim()
      },
      body: JSON.stringify(allUsersData)
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMsg = result.message || `Erro HTTP ${response.status}`;
      console.error('Erro ao atualizar bin:', {
        status: response.status,
        error: errorMsg,
        result: result
      });
      
      if (response.status === 404) {
        // Bin compartilhado não existe, cria com os dados do usuário
        console.log('Bin não encontrado, criando novo...');
        const createResult = await createSharedBin(masterKey, { [userBinId]: userData });
        return createResult;
      }
      
      if (response.status === 401 || response.status === 403) {
        return { success: false, error: 'Master Key inválida ou sem permissão.' };
      }

      return { success: false, error: errorMsg };
    }

    console.log('Dados do usuário salvos com sucesso no bin:', sharedBinId);
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Erro ao atualizar dados do usuário. Verifique sua conexão.' 
    };
  }
}

/**
 * Busca o bin compartilhado completo
 * @param {string} masterKey - Master Key (opcional)
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
async function getSharedBin(masterKey) {
  try {
    const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
    
    if (!keyToUse || keyToUse === 'SUA_MASTER_KEY_AQUI') {
      return { success: false, error: 'Master Key não configurada.' };
    }

    // Obtém o ID do bin compartilhado (cria se não existir)
    const sharedBinId = await getSharedBinId(masterKey);
    if (!sharedBinId) {
      return { success: false, error: 'Não foi possível obter ou criar o bin compartilhado.' };
    }

    const response = await fetch(`${JSONBIN_API_BASE}/${sharedBinId}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': keyToUse.trim()
      }
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMsg = result.message || `Erro HTTP ${response.status}`;
      
      if (response.status === 404) {
        // Bin não existe ainda, retorna objeto vazio
        return { success: true, data: {} };
      }
      
      if (response.status === 401 || response.status === 403) {
        return { success: false, error: 'Master Key inválida ou sem permissão.' };
      }

      return { success: false, error: errorMsg };
    }

    const data = result.record || result || {};
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Erro ao buscar banco de dados. Verifique sua conexão.' 
    };
  }
}

/**
 * Cria o bin compartilhado inicial (ou atualiza se já existir)
 * @param {string} masterKey - Master Key (opcional)
 * @param {object} initialData - Dados iniciais
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function createSharedBin(masterKey, initialData) {
  try {
    const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
    
    if (!keyToUse || keyToUse === 'SUA_MASTER_KEY_AQUI') {
      return { success: false, error: 'Master Key não configurada.' };
    }

    // Obtém ou cria o bin compartilhado
    const sharedBinId = await getSharedBinId(masterKey);
    if (!sharedBinId) {
      // Tenta criar novamente para obter detalhes do erro
      const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
      try {
        const testData = { _initialized: true, _created: new Date().toISOString() };
        const testResponse = await fetch(JSONBIN_API_BASE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': keyToUse.trim(),
            'X-Bin-Private': 'true'
          },
          body: JSON.stringify(testData)
        });
        const testResult = await testResponse.json();
        
        let errorMsg = 'Não foi possível criar o bin compartilhado.';
        if (!testResponse.ok) {
          const apiError = testResult.message || testResult.error || JSON.stringify(testResult);
          errorMsg += `\n\nErro ${testResponse.status}: ${apiError}`;
          
          if (testResponse.status === 401 || testResponse.status === 403) {
            errorMsg += '\n\nVerifique se a Master Key está correta e tem permissão para criar bins (CREATE).';
          } else if (testResponse.status === 400) {
            errorMsg += '\n\nA requisição está malformada. Verifique o console do navegador para mais detalhes.';
          } else if (testResponse.status === 429) {
            errorMsg += '\n\nLimite de requisições atingido. Tente novamente mais tarde.';
          }
        }
        return { success: false, error: errorMsg };
      } catch (e) {
        return { success: false, error: `Não foi possível criar o bin compartilhado: ${e.message}\n\nVerifique o console do navegador para mais detalhes.` };
      }
    }

    // Se há dados iniciais, atualiza o bin
    if (initialData && Object.keys(initialData).length > 0) {
      const getResult = await getSharedBin(masterKey);
      const currentData = getResult.success ? (getResult.data || {}) : {};
      const updatedData = { ...currentData, ...initialData };
      
      const response = await fetch(`${JSONBIN_API_BASE}/${sharedBinId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': keyToUse.trim()
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        const result = await response.json();
        return { success: false, error: result.message || `Erro HTTP ${response.status}` };
      }
    }

    return { success: true, binId: sharedBinId };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Erro ao criar banco de dados. Verifique sua conexão.' 
    };
  }
}

/**
 * Busca dados de um usuário específico do bin compartilhado
 * @param {string} userBinId - ID do usuário
 * @param {string} masterKey - Master Key (opcional)
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
async function getUserData(userBinId, masterKey) {
  try {
    if (!userBinId || typeof userBinId !== 'string' || userBinId.trim().length === 0) {
      return { success: false, error: 'ID do usuário inválido' };
    }

    console.log('Buscando dados do usuário:', userBinId);
    const getResult = await getSharedBin(masterKey);
    
    if (!getResult.success) {
      console.error('Erro ao buscar bin compartilhado:', getResult.error);
      return { success: false, error: getResult.error };
    }

    const allUsersData = getResult.data || {};
    console.log('Dados de todos os usuários no bin:', Object.keys(allUsersData));
    console.log('Dados completos do bin:', allUsersData);
    
    const userData = allUsersData[userBinId];

    if (!userData) {
      console.warn(`Usuário "${userBinId}" não encontrado no banco. Usuários disponíveis:`, Object.keys(allUsersData));
      return { success: true, data: null }; // Usuário não existe ainda, retorna null
    }

    console.log('Dados do usuário encontrados:', {
      hasDecks: !!userData.decks,
      decksCount: userData.decks ? userData.decks.length : 0,
      hasTags: !!userData.tags,
      tagsCount: userData.tags ? userData.tags.length : 0
    });

    return { success: true, data: userData };
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return { 
      success: false, 
      error: error.message || 'Erro ao buscar dados do usuário. Verifique sua conexão.' 
    };
  }
}

/**
 * Atualiza um bin existente no JSONBin.io (mantido para compatibilidade)
 * @param {string} binId - ID do bin a ser atualizado
 * @param {string} masterKey - Master Key do JSONBin.io (opcional, usa DEFAULT_MASTER_KEY se não fornecido)
 * @param {object} data - Novos dados
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function updateBin(binId, masterKey, data) {
  try {
    if (!validateBinId(binId)) {
      return { success: false, error: 'Bin ID inválido' };
    }

    const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
    
    if (!keyToUse || keyToUse === 'SUA_MASTER_KEY_AQUI') {
      return { success: false, error: 'Master Key não configurada. Configure DEFAULT_MASTER_KEY no código.' };
    }

    const response = await fetch(`${JSONBIN_API_BASE}/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': keyToUse.trim()
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMsg = result.message || `Erro HTTP ${response.status}`;
      
      if (response.status === 404) {
        return { success: false, error: 'Bin não encontrado. O Bin ID não existe ainda.' };
      }
      
      if (response.status === 401 || response.status === 403) {
        return { success: false, error: 'Master Key inválida ou sem permissão.' };
      }

      // Verifica se a mensagem de erro indica bin não encontrado
      if (errorMsg.includes('Invalid Bin Id') || errorMsg.includes('not found')) {
        return { success: false, error: 'Bin não encontrado. O Bin ID não existe ainda.' };
      }

      return { success: false, error: errorMsg };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Erro ao atualizar bin. Verifique sua conexão.' 
    };
  }
}

/**
 * Busca dados de um bin no JSONBin.io
 * @param {string} binId - ID do bin
 * @param {string} masterKey - Master Key do JSONBin.io (opcional, usa DEFAULT_MASTER_KEY se não fornecido)
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
async function getBin(binId, masterKey) {
  try {
    if (!validateBinId(binId)) {
      return { success: false, error: 'Bin ID inválido' };
    }

    const keyToUse = (masterKey && masterKey.trim()) || DEFAULT_MASTER_KEY;
    
    if (!keyToUse || keyToUse === 'SUA_MASTER_KEY_AQUI') {
      return { success: false, error: 'Master Key não configurada. Configure DEFAULT_MASTER_KEY no código.' };
    }

    const response = await fetch(`${JSONBIN_API_BASE}/${binId}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': keyToUse.trim()
      }
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMsg = result.message || `Erro HTTP ${response.status}`;
      
      if (response.status === 404) {
        return { success: false, error: 'Bin não encontrado. Verifique o Bin ID.' };
      }
      
      if (response.status === 401 || response.status === 403) {
        return { success: false, error: 'Master Key inválida ou sem permissão.' };
      }

      return { success: false, error: errorMsg };
    }

    // JSONBin retorna os dados em result.record
    const data = result.record || result;
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Erro ao buscar bin. Verifique sua conexão.' 
    };
  }
}

// Exportar funções para uso global (já que não há módulos ES6)
if (typeof window !== 'undefined') {
  window.jsonbinService = {
    createBin,
    updateBin,
    getBin,
    validateBinId,
    verifyBinId,
    // Novas funções para banco de dados compartilhado
    updateUserData,
    getUserData,
    getSharedBin,
    createSharedBin,
    getSharedBinId
  };
}
