"use server";

import Kernel from "@onkernel/sdk";
import { resolution } from "./tool";

const ONKERNEL_API_KEY = "sk_85dd38ea-b33f-45b5-bc33-0eed2357683a.t2lQgq3Lb6DamEGhcLiUgPa1jlx+1zD4BwAdchRHYgA";

const client = new Kernel({
  apiKey: ONKERNEL_API_KEY,
});

export const getDesktop = async (id?: string) => {
  try {
    if (id) {
      const browser = await client.browsers.retrieve(id);
      return browser;
    }

    const browser = await client.browsers.create({
      viewport: {
        width: resolution.x,
        height: resolution.y,
      },
    });
    
    return browser;
  } catch (error) {
    console.error("Error in getDesktop:", error);
    throw error;
  }
};

export const getDesktopURL = async (id?: string) => {
  try {
    const desktop = await getDesktop(id);
    const streamUrl = desktop.browser_live_view_url || "";

    return { streamUrl, id: desktop.session_id };
  } catch (error) {
    console.error("Error in getDesktopURL:", error);
    throw error;
  }
};

export const killDesktop = async (id: string) => {
  try {
    await client.browsers.deleteByID(id);
  } catch (error) {
    console.error("Error in killDesktop:", error);
  }
};
