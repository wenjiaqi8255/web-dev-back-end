import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "wen";
const yourPassword = "10011";
const yourAPIKey = '0abc2bb9-93af-4e64-bab6-8819ed78c566';
const yourBearerToken = "4ec253cf-f480-4ba0-bc28-4b7b149bd0ee";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    var randomSecret = await axios.get('https://secrets-api.appbrewery.com/random');
    res.render('index.ejs',{content:JSON.stringify(randomSecret.data)})
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try {
    // await axios.post('https://secrets-api.appbrewery.com/register',
    // {
    //   username: yourUsername,
    //   password: yourPassword
    // });

    // const allSecret=await axios.get(`https://secrets-api.appbrewery.com/all?page=2`,{
    //   auth: {
    //     username: yourUsername,
    //     password: yourPassword
    //   },
    // });
    var allSecret = await axios.get(
      API_URL + "/all?page=2",
      {}, //注意这里的写法
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
      console.log(JSON.stringify(allSecret.data));
    res.render('index.ejs', {content:JSON.stringify(allSecret.data)});

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  try {
    //注意，常量不能赋值，这里不能获取，需要查完了在开头给常量赋值
    // yourAPIKey= await axios.get('https://secrets-api.appbrewery.com/generate-api-key');
    const filterResult= await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`)
    //参考答案里的写法是：
    // const result = await axios.get(API_URL + "/filter", {
    //   params: {
    //     score: 5,
    //     apiKey: yourAPIKey,
    //   },
    // });
    res.render('index.ejs',{content:JSON.stringify(filterResult.data)})
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

//参考答案的写法：（token）
// const config = {
//   headers: { Authorization: `Bearer ${yourBearerToken}` },
// };

app.get("/bearerToken", async (req, res) => {
  try {
    const secretWithId= await axios.get('https://secrets-api.appbrewery.com/secrets/42',{
    headers:{
      Authorization:`Bearer ${yourBearerToken}`
    }
  });
  //参考答案的写法：
  // const result = await axios.get(API_URL + "/secrets/2", config);
  res.render('index.ejs',{content:JSON.stringify(secretWithId.data)});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
