export const shuffle = (array) => {
 let currentIndex = array.length;
 let temporaryValue;
 let randomIndex;

 // While there remain elements to shuffle...
 while (0 !== currentIndex) {
   // Pick a remaining element...
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex -= 1;

   // And swap it with the current element.
   temporaryValue = array[currentIndex];
   array[currentIndex] = array[randomIndex];
   array[randomIndex] = temporaryValue;
 }

 return array;
}

export const  shuffleQuestions = async (data) =>{
  const dataSet = []

  const shuffledQuestions = shuffle(data)
   //Traverses through shuffledQuestions and outputs a new array of objects with new answers property
  for(var i = 0 ; i<shuffledQuestions.length; i++){
    var shuffledAnswers = []
    var j = 0
  //Adds random answers into array
  do {
    //Gets random index
    if(shuffledQuestions.length<4){
      shuffledAnswers.push(randomAnswers())
      j++;
    }
    var x = Math.floor(Math.random () * shuffledQuestions.length)
    //Checks if current index is not the current quest AND not already in the array
    if(shuffledQuestions[x].q_id !== shuffledQuestions[i].q_id &&
        !shuffledAnswers.includes(shuffledQuestions[x])){
      shuffledAnswers.push(shuffledQuestions[x])
      j++;
    }
  } while(j<3)
  
  shuffledAnswers.push(shuffledQuestions[i])  //Push the actual answer into array
  let y = shuffledAnswers.map(answer => ({
    answer: answer.q_answer,
    q_id: answer.q_id})) //Maps only q_answer property
  var xx = Object.assign({answers: y}, shuffledQuestions[i]) // Adds property to array
  dataSet.push(xx)
  }
  return dataSet
}

export const randomAnswers = () =>{
  var randomAnswers = ['Seen in Luke-Acts', 'Groups that are primarily Gentile are having to define themselves as Judaism or Paganism',
'A way of creating a sense of distinction when you are really very similar', 'Direct contuation of sectarianism','A deterioration in language functioning. This can occur due to various factors, including a stroke, the onset of dementia, or psychosis.', 'A psychotropic medication primarily prescribed by physicians to relieve symptoms of depression in certain patients.', 'Refers to the progress when people partially or selectively change. They follow the rules and standards of the dominant culture only in certain situations.', 'This is when discrimination is concealed or hidden.', 'When an individual has freedom and responsibility.',  'The Hawaiian Word For "Family"'
, 'The use of words or sounds which resemble the sounds they describe', 'To Throw Something Out Of A Window']
return randomAnswers}