
export const getUserAPICall = async (userData) => {
  let api_endpoint = 'https://studentplannerapi.azurewebsites.net/api/getUser?email_id=' + userData.email;
  const response = await fetch(api_endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Host': 'studentplannerapi.azurewebsites.net',
      'Authorization': 'Basic c3R1ZGVudHBsYW5uZXItYWRtaW4tb206NTA1MjQzMTMtYjUzMy00ZjlmLTg5ODktYmNjYzNlZjcwOTQ0'
    }
  }).catch(error => console.error('There was a problem with the fetch operation:', error));

  if (response && response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "ERROR";
  }
}

export const createUserAPICall = async (userData) => {
  let api_endpoint = 'https://studentplannerapi.azurewebsites.net/api/createuser?email_id=' + userData.email;
  const response = await fetch(api_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3R1ZGVudHBsYW5uZXItYWRtaW4tb206NTA1MjQzMTMtYjUzMy00ZjlmLTg5ODktYmNjYzNlZjcwOTQ0'
    },
    body: JSON.stringify({
      user_type: userData.user_type,
      verification_code: userData.verification_code
    })
  }).catch(error => console.error('There was a problem with the fetch operation:', error));

  if (response && response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "ERROR";
  }
}

export const obtainAssignmentsAPICall = async (userData) => {
  let api_endpoint = 'https://studentplannerapi.azurewebsites.net/api/obtainassignments?email_id=' + userData.email_id;
  const response = await fetch(api_endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Host': 'studentplannerapi.azurewebsites.net',
      'Authorization': 'Basic c3R1ZGVudHBsYW5uZXItYWRtaW4tb206NTA1MjQzMTMtYjUzMy00ZjlmLTg5ODktYmNjYzNlZjcwOTQ0'
    }
  }).catch(error => console.error('There was a problem with the fetch operation:', error));

  if (response && response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "ERROR";
  }
}

export const obtainClassesAPICall = async (userData) => {
  let api_endpoint = 'https://studentplannerapi.azurewebsites.net/api/obtainclasses?email_id=' + userData.email_id;

  const response = await fetch(api_endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3R1ZGVudHBsYW5uZXItYWRtaW4tb206NTA1MjQzMTMtYjUzMy00ZjlmLTg5ODktYmNjYzNlZjcwOTQ0'
    }
  }).catch(error => console.error('There was a problem with the fetch operation:', error));

  if (response && response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "ERROR";
  }

}

export const createClassAPICall = async (userData, class_detail) => {
  let api_endpoint = 'https://studentplannerapi.azurewebsites.net/api/createclass?email_id=' + userData.email_id;

  const response = await fetch(api_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3R1ZGVudHBsYW5uZXItYWRtaW4tb206NTA1MjQzMTMtYjUzMy00ZjlmLTg5ODktYmNjYzNlZjcwOTQ0'
    },
    body: JSON.stringify(class_detail)
  }).catch(error => console.error('There was a problem with the fetch operation:', error));

  if (response && response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "ERROR";
  }

}

export const updateClassAPICall = async (userData, class_detail) => {
  let api_endpoint = 'https://studentplannerapi.azurewebsites.net/api/updateclass?email_id=' + userData.email_id;

  const response = await fetch(api_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3R1ZGVudHBsYW5uZXItYWRtaW4tb206NTA1MjQzMTMtYjUzMy00ZjlmLTg5ODktYmNjYzNlZjcwOTQ0'
    },
    body: JSON.stringify(class_detail)
  }).catch(error => console.error('There was a problem with the fetch operation:', error));

  if (response && response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "ERROR";
  }

}

export const createAssignmentAPICall = async (userData, assignment_detail) => {
  let api_endpoint = 'https://studentplannerapi.azurewebsites.net/api/createassignment?email_id=' + userData.email_id;

  const response = await fetch(api_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3R1ZGVudHBsYW5uZXItYWRtaW4tb206NTA1MjQzMTMtYjUzMy00ZjlmLTg5ODktYmNjYzNlZjcwOTQ0'
    },
    body: JSON.stringify(assignment_detail)
  }).catch(error => console.error('There was a problem with the fetch operation:', error));

  if (response && response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "ERROR";
  }

}

export const deleteAssignmentAPICall = async (userData, assignment_id) => {
  let api_endpoint = 'https://studentplannerapi.azurewebsites.net/api/deleteassignment?email_id=' + userData.email_id;

  const response = await fetch(api_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3R1ZGVudHBsYW5uZXItYWRtaW4tb206NTA1MjQzMTMtYjUzMy00ZjlmLTg5ODktYmNjYzNlZjcwOTQ0'
    },
    body: JSON.stringify({
      "assignment_id":assignment_id
    })
  }).catch(error => console.error('There was a problem with the fetch operation:', error));

  if (response && response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "ERROR";
  }

}