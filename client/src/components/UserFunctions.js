import axios from 'axios'

export const login = user =>{
 return axios({
  method: 'POST', 
  url:'/login', 
  'content-type': 'application/json',
  data: {
      username: user.username, 
      password: user.password
  }
}).then(res =>{
 localStorage.setItem('usertoken', res.data);

 return res.data;
}).catch(err =>{
 console.log(err);
})
}