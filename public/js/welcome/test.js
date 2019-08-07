const uniqueName = "#frontendguys64325";
const token = 'Bearer cad6d168098f4229596142e1f7be6eca7d7c0a9fff613756f9bd9df574728a8f';

fetch('https://goalsetterapi.herokuapp.com/api/workspace/request' , {
    method: "POST",
    mode: "cors",
    headers: {
        'Authorization': token,
        'Content-Type': "application-json"
    },
    body: {
        unique_name: uniqueName
    }
}) 
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));