import React, { useState } from 'react';

const TestComponent = () => {
    const [responseText, setResponseText] = useState('');
    const requestData = {
        key1: 'value1',
        key2: 'value2',
    };

    const sendPostRequest = async () => {
        try {
            const storedCookie = document.cookie;
            console.log(storedCookie);
// Create a custom set of headers
            const customHeaders = new Headers({
                'Content-Type': 'application/json', // You may need to adjust the content type based on your request
                'Cookie': storedCookie, // Include the retrieved cookie in the 'Cookie' header
            });
            const headersObject = Object.fromEntries(customHeaders.entries());
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            // const response = await fetch('http://localhost:8080/v1/test', {
                method: 'POST',
                credentials: 'include',  // Include credentials (cookies) in the request
                headers: headersObject,
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const responseData = await response.json();
                setResponseText(JSON.stringify(responseData, null, 2));
            } else {
                setResponseText(`Error: ${response.status} - ${response.statusText}`);
                console.log(response)
            }
        } catch (error) {
            setResponseText(`Error: ${error.message}`);
            // console.log(response)
        }
    };

    return (
        <div>
            <button onClick={sendPostRequest}>Send POST Request</button>
            {responseText && (
                <div>
                    <h2>Response:</h2>
                    <pre>{responseText}</pre>
                </div>
            )}
        </div>
    );
};

export default TestComponent;
