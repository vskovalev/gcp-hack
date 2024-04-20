// utils/api-limit.ts

import prismadb from '../utils/prismadb';
import { MAX_FREE_COUNTS } from '../../../constants';

export const incrementApiLimit = async (userId) => {
  if (!userId) {
    
    return;
  }
  

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const checkApiLimit = async (userId) => {
    
  if (!userId) {
    
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where:  { userId: userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async (userId) => {
  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};


  