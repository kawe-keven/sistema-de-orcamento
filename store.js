const Store = (() => {
  const keys = { quotes: 'workspace.quotes.v1', notifications: 'workspace.notifications.v1', templates: 'workspace.templates.v1', settings: 'workspace.settings.v1' };
  const seed = [
    { id: 'q-aurora', client: 'Estúdio Aurora', email: 'contato@aurora.studio', project: 'Identidade visual', description: 'Logo, paleta e mini guia de uso.', price: 2400, discount: 0, status: 'sent', createdAt: '2026-09-12T10:00:00.000Z' },
    { id: 'q-joao', client: 'João Martins', email: 'joao@email.com', project: 'Landing page', description: 'Página de conversão responsiva.', price: 1850, discount: 0, status: 'approved', createdAt: '2026-09-09T10:00:00.000Z' },
    { id: 'q-cafe', client: 'Café Botânico', email: 'oi@cafebotanico.com', project: 'Social media · Maio', description: 'Calendário editorial e peças.', price: 980, discount: 0, status: 'draft', createdAt: '2026-09-06T10:00:00.000Z' },
    { id: 'q-lia', client: 'Lia Coelho', email: 'lia@email.com', project: 'Direção de arte', description: 'Direção visual para campanha.', price: 3200, discount: 0, status: 'sent', createdAt: '2026-09-02T10:00:00.000Z' }
  ];
  const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const init = () => { if (!localStorage.getItem(keys.quotes)) write(keys.quotes, seed); if (!localStorage.getItem(keys.notifications)) write(keys.notifications, []); if (!localStorage.getItem(keys.templates)) write(keys.templates, []); };
  init();
  return {
    async list(type = 'quotes') { return read(keys[type], []); },
    async get(id) { return (await this.list('quotes')).find(item => item.id === id) || null; },
    async upsert(type, item) { const list = await this.list(type); const index = list.findIndex(entry => entry.id === item.id); index >= 0 ? list.splice(index, 1, item) : list.unshift(item); write(keys[type], list); return item; },
    async remove(type, id) { write(keys[type], (await this.list(type)).filter(item => item.id !== id)); },
    async notify(notification) { const list = await this.list('notifications'); list.unshift({ id: `n-${Date.now()}`, createdAt: new Date().toISOString(), read: false, ...notification }); write(keys.notifications, list); },
    async settings() { return read(keys.settings, { theme: 'light', reduceMotion: false }); },
    async saveSettings(settings) { write(keys.settings, settings); }
  };
})();