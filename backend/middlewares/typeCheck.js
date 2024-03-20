const { z } = require("zod");

const profileSchema = z.object({
  username: z.string().min(4, "minimum 4 characters required"),
  description: z.string().min(4, "description is required"),
  links: z.array(z.string().min(4, "atleast 1 link req")),
  interests: z.array(z.string().min(4, "atleast 1 insterest req")),
});

const idSchema = z.string();

const idTypeCheck = function (req, res, next) {
  const idValid = idSchema.safeParse(req.params.profileId);
  if (!idValid.success) {
    return res.json({ error: true, msg: "invalid id" });
  } else {
    next();
  }
};

const profileTypeCheck = function (req, res, next) {
  const profileValidType = profileSchema.safeParse(req.body);
  if (!profileValidType.success) {
    return res.json({ error: true, msg: "invalid input" });
  } else {
    next();
  }
};

module.exports = {
  profileTypeCheck,
  idTypeCheck,
};
