import { ROLES } from '../../src/utils/enums';
declare global {
    namespace Express {
      interface Request {
        tokenData?: {
          email?: string
          userId: number
          role: ROLES
        }
      }
    }
  }
  