let token = "Bearer 12c5b219e4b2d175e06e0b8b01ea424b2e8232ea5fc7d046ed9c59226e81c882";

fetch("https://goalsetterapi.herokuapp.com/api/interest/select", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    headers: {
        Authorization: token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"user_interests" : [[2,1], [1,2]]})
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error.response));
