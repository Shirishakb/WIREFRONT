import componentProps from '../../interfaces/componentProps';

const API_BASE_URL = 'https://your-backend-api.com/components';

const componentApi = {
  async save(components: componentProps[]) {
    const response = await fetch(`${API_BASE_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ components }),
    });
    if (!response.ok) throw new Error('Failed to save components');
    return await response.json();
  },

  async delete(componentId: number) {
    const response = await fetch(`${API_BASE_URL}/delete/${componentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete component');
    return await response.json();
  },
};

export default componentApi;
