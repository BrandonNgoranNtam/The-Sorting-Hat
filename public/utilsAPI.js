async function postData(url = "", data = {}, token) {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: "Bearer " + token })
            }
        });
        return await response.json();
    } catch (err) {

    }
}

async function getData(url = '',token) {
    // Default options are marked with *
    console.log("testget");
    const response = await fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(token && {'Authorization': token}),
        }
    });
    console.log("LOLOLOL");
    return await response.json(); // parses JSON response into native JavaScript objects
}


export { postData, getData };
