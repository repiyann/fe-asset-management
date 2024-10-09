export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
        const loginRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(credentials).toString(),
          },
        );

        const loginData = await loginRes.json();
        if (!loginRes.ok || !loginData?.success) {
          throw new Error(loginData?.message ?? "Invalid credentials");
        }

        const { access_token: token, refresh_token: refreshToken } =
          loginData.data;

        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const userData = await userRes.json();
        if (!userRes.ok || !userData?.success) {
          throw new Error(userData?.message ?? "Failed to fetch user data");
        }

        const { username, role, email, full_name: fullName } = userData.data;

        return {
          id: token,
          username,
          role,
          email,
          fullName,
          accessToken: token,
          refreshToken,
        };
				
			},
		}),
	],