function assertEqual(name, actual, expected) {
  if (actual === expected) {
    console.log(`✅ PASS: ${name}`);
  } else {
    console.log(`❌ FAIL: ${name}`);
    console.log("Expected:", expected, "Got:", actual);
  }
}

const testData = {
  longitude: 123.456, // replace with real
  expected: {
    D60: 6,
    D16: 3,
    D20: 8,
  },
};

assertEqual("D60", D60(testData.longitude), testData.expected.D60);
assertEqual("D16", D16(testData.longitude), testData.expected.D16);
assertEqual("D20", D20(testData.longitude), testData.expected.D20);
