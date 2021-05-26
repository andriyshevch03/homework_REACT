const URL = "https://reactapp-b35ab-default-rtdb.firebaseio.com/List.json"

export const getAllContacts = () =>{
    const allContacts = fetch(URL).then(response => {
        return response.json();
    }).then(data => {
        return data;
    })
    .catch(err => {
        return err;
    });

    return allContacts;
}

export const updateContacts = (contacts) => {
    fetch(URL, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contacts)
    })
}