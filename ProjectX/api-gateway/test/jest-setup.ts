global.console = {
  ...console,
  // log: jest.fn(), // Descomente se quiser silenciar os logs
};

// Aumenta o timeout para testes assíncronos
jest.setTimeout(30000);
