import hkdf from "futoin-hkdf";
import jose from "jose";
// Set default algorithm to use for auto-generated signing key
const DEFAULT_SIGNATURE_ALGORITHM = "HS512";

// Set default algorithm for auto-generated symmetric encryption key
// const DEFAULT_ENCRYPTION_ALGORITHM = 'A256GCM'

module.exports = (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    res.send(
      "Ooops! This endpoint is just for some developer testing, when in development mode. But right now, you're not supposed to be able to see anything here."
    );
  }

  const secret = process.env.SECRET;

  // The next lines are copied from next-auth/src/lib/jwt.js
  // https:///github.com/nextauthjs/next-auth/blob/2ea64045cb28cbe0167a9bd8cd65c2d752e452fb/src/lib/jwt.js#L53u

  const buffer = hkdf(secret, 64, {
    info: "NextAuth.js Generated Signing Key",
    hash: "SHA-256",
  });

  const secretKeyBase = Buffer.from(buffer).toString("base64");
  // == iow

  const key = jose.JWK.asKey(buffer, {
    alg: DEFAULT_SIGNATURE_ALGORITHM,
    use: "sig",
    kid: "nextauth-auto-generated-signing-key",
  });

  const verificationOptions = {
    algorithms: ["HS512"],
  };

  let jwtDecoded = {};

  const tokenToVerify = req.cookies["next-auth.session-token"];
  if (tokenToVerify) {
    jwtDecoded = jose.JWT.verify(tokenToVerify, key, verificationOptions);
  }

  console.log(typeof buffer);
  console.log(buffer);
  console.log(key);
  console.log(jwtDecoded);

  let note =
    "Validate the JWT in Python (using that secretKeyBase, not using the raw secret) like this: `import jwt; jwt.decode(encoded, base64.b64decode(secretKeyBase), algorithms=['HS512'])`.";
  note +=
    " That is, Python doesn't need to know the raw secret, if we know secretKeyBase.";

  res.json({
    body: req.body,
    secret: secret,
    secretKeyBase,
    note,
    // bufferToStringHex: buffer.toString("hex"),
    // bufferToString: buffer.toString("ascii"),
    // buffer: buffer,
    // key,
    // keyToJson: key.toJSON(),
    jwtDecoded,
    query: req.query,
    cookies: req.cookies,
    "process.env.NODE_ENV": process.env.NODE_ENV,
    // "process.env": process.env,
  });
};
