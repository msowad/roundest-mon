import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "src/server/routers/app";

export const trpc = createReactQueryHooks<AppRouter>();
