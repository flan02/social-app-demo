import {
  getSession,
  getAccessToken,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const { user } = getSession(req, res);

    //const baseUrl = `https://sa-east-1.aws.data.mongodb-api.com/app/data-ipfrx/endpoint/data/v1/action`;
    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
    switch (req.method) {
      case "GET":
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const readData = await fetch(`${baseUrl}/findOne`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            jwtTokenString: accessToken,
          },
          body: JSON.stringify({
            dataSource: process.env.MONGODB_DATA_SOURCE,
            database: "socialmedia",
            collection: "users",
          }),
        });

        const readDataJson = await readData.json();
        if (!readDataJson.document.email) {
          await fetch(`${baseUrl}/updateOne`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              jwtTokenString: accessToken,
            },
            body: JSON.stringify({
              dataSource: process.env.MONGODB_DATA_SOURCE,
              database: "socialmedia",
              collection: "users",
              filter: { _id: { $oid: readDataJson.document._id } },
              update: {
                $set: {
                  name: user.name,
                  email: user.email,
                  picture: user.picture,
                  nickname: user.nickname,
                },
              },
            }),
          });
          readDataJson.document = {
            ...readDataJson.document,
            name: user.name,
            email: user.email,
            picture: user.picture,
            nickname: user.nickname,
          };
        }

        res.status(200).json(readDataJson.document);
        break;
      case "PUT":
        const updateData = await fetch(`${baseUrl}/updateOne`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            jwtTokenString: accessToken,
          },
          body: JSON.stringify({
            dataSource: process.env.MONGODB_DATA_SOURCE,
            database: "socialmedia",
            collection: "users",
            filter: { _id: { $oid: req.body._id } },
            update: {
              $set: {
                nickname: req.body.nickname,
                picture: req.body.picture,
              },
            },
          }),
        });
        const updateDataJson = await updateData.json();
        res.status(200).json(updateDataJson);
        break;
      default: //Method Not Allowed
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
