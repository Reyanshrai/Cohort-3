import crypto from "crypto";

const createTokenHash = (refrehToken) =>{
    
    const tokenHash = crypto
                        .createHash("sha256")
                        .update(refrehToken)
                        .digest("hex")

    return tokenHash
}

export default createTokenHash