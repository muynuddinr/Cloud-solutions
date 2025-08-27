FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build


# -- Production image --
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://muynmuyn786:1234@cluster0bhuvi.0otmzh4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0bhuvi
ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
ENV ADMIN_USERNAME=Admin
ENV ADMIN_PASSWORD=Cloudit@admin123
ENV JWT_SECRET=rr:]:4aJruY*j|KAtu!EZ!A9c8-]@E$So!AO/Zo:2Z2>a=JCL?S^+X%T>}_$2B=*:JBp/X1mpT&6zBos,yr]{S7-sD=$]w):kD_drEmzE4nxEXd1C<&v$ELIN(]=8*ddIvnA(>Tzt?t.f$Rm!>[K.j_56%m^gs1T%VOWeo7VrpHk;B;]se*Gv9#}4<faF_nS.wK0jPYL0f%iz:9EP.P2.uC3{rYq{0toq}4,mQGIs%yqi+odsD,]+ci)MYcP9fL27

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

EXPOSE 8080
CMD ["npm", "run", "start"]
