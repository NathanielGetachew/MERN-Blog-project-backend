
const calculateReadingtime = (text)=>{

const wordsPerMinute = 200;
const words = text?.split(/\s/g).length;
const minutes = words /  wordsPerMinute;
const readTime = Math.ceil(minutes)
return readTime;
}
 export default calculateReadingtime;
