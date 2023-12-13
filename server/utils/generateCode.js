const generateCode = (n) => {
  const add = 1;
  let max = 2 + add; // Update the max value to 2 for the year part

  if (n > max) {
    return Math.random().toString().slice(2, n + 2);
  }

  max = Math.pow(10, n + add);
  const min = max / 10; // Math.pow(10, n) basically
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  return String(number).slice(add);
};

module.exports = generateCode;








// const GenerateCode = (n) => {
//   var add = 1,
//     max = 2 + add; // Update the max value to 2 for the year part

//   if (n > max) {
//     return generate(max) + generate(n - max);
//   }

//   max = Math.pow(10, n + add);
//   var min = max / 10; // Math.pow(10, n) basically
//   var number = Math.floor(Math.random() * (max - min + 1)) + min;

//   return ("" + number).substring(add);
// };

// module.exports = GenerateCode;
