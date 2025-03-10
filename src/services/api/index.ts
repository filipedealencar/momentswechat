export const apiClient = {
  get: async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  },
};
