exports.getQuestions = (questions) => {
  let questionsArray = new Array();

  questions.forEach((question) => {
    questionsArray = [...questionsArray, addQUestion(question)];
  });

  return questionsArray;
};

function addQUestion(body) {
  let question = new Object();
  question.name = body.name;
  question.type = body.type;

  question.type === "options"
    ? (question.options = getOptions(body.options))
    : (question.options = null);

  return question;
}

function getOptions(options) {
  let temOptions = new Array();

  options.forEach((option) => {
    temOptions = [
      ...temOptions,
      {
        value: option.value,
        rate: 0,
      },
    ];
  });

  return temOptions;
}
