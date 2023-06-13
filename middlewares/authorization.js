const { getUserPermissions } = require('../models/services/UserPermission');

const authorize = (permissions = []) => {
   return async (req, res, next) => {
      let userId = req.user.user_id;
      // get all permission belongs to user
      let userPermissions = await getUserPermissions(userId);
      // check ANY permission in endpoint permissions which authorize ANYONE to use endpoint
      if (permissions.includes('ANY')) return next();
      // check *.* permission in user permission which means that user have access to every thing
      else if (userPermissions.includes('*.*')) return next();

      // final step to check if any of endpoints permissions included in user permissions
      for (const permission in permissions) {
         if (userPermissions.includes(permission)) {
            return next();
         }
      }
      return res.status(403).json({ message: "You don't have the permission to access this resource" });
   };
};

module.exports = authorize;
