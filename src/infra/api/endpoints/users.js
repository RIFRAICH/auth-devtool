"use client";

import { apiClient } from "@/infra/api/api-client";
import { ApiPath } from "@/infra/api/api-paths";

export async function getCurrentUser() {
  return apiClient.get(ApiPath.USER_ME);
}
export async function createCurrentUser() {
  return apiClient.post(ApiPath.USER_ME);
}
