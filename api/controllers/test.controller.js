export const shouldBeLoggedIn = async (req, res) => {
  // console.log(req.userId);
  res.json({ message: "You are logged in." });
};

export const shouldBeAdmin = async () => {};
