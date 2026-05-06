const { ApiError } = require('../utils/ApiError');
const rbac = require('../utils/rbac');

/**
 * Express middleware — يتطلب role admin + صلاحية محددة من rbac
 * @param {string|null} permissionKey — null يعني أي أدمن
 */
function requireAdminPermission(permissionKey = null) {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        throw new ApiError(403, 'صلاحيات غير كافية');
      }
      if (permissionKey && !rbac.hasPermission(rbac.adminUserFromDoc(req.user), permissionKey)) {
        throw new ApiError(403, 'ليس لديك هذه الصلاحية');
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}

module.exports = { requireAdminPermission };
