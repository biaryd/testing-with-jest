const stack = require('../src/stack');

// Test för min/max funktioner
test('min and max functions return correct values', () => {
  // Rensa stacken först
  while(stack.pop() !== undefined) {}
  
  // Lägger till fördefinierade testvärden
  stack.push(5);
  stack.push(3);
  stack.push(8);
  
  // Testar min-funktionen
  expect(stack.min()).toBe(3);
  
  // Testa max-funktionen
  expect(stack.max()).toBe(8);
  
  // Kontrollerar att stacken inte förändras av funktionerna
  expect(stack.peek()).toBe(8);
});