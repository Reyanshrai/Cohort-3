import createTokenHash from "../utils/tokenHash.utils.js";
import userModel from "../models/user.model.js";
import refreshModel from "../models/refreshSession.model.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/auth.utils.js";

/**
 * @description Register an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.name String
 * @param req.body.password String
 */

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already Exists",
      errors: [
        {
          path: "email",
          message: "User already exists with this email",
        },
      ],
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const accessToken = createAccessToken({
    userId: user._id,
  });

  res.status(201).json({
    message: "User Created Successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

/**
 * @description login an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.password String
 */

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = createAccessToken({
    userId: user._id,
  });

  const refreshToken = createRefreshToken({
    userId: user._id,
  });

  const tokenHash = createTokenHash(refreshToken);

  const refreshSession = await refreshModel.create({
    userId: user._id,
    tokenHash,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({
    message: "User successfully looged in",
    data: {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    accessToken,
  });
};

/**
 * @description login an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.password String
 */

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Invaild refresh token",
    });
  }

  try {
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = createAccessToken({ userId });

    res.status(200).json({
      message: "Access Token created successfully",
      data: {
        userId: userId,
      },
      accessToken,
    });

  } catch (error) {
    return res.status(401).josn({
        message : "Invalid refresh token"
    })
  }
};
