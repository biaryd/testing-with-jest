const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});


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