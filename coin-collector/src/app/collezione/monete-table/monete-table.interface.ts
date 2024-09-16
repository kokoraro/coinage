import { Moneta } from 'src/app/database/indexed-db.service';

export interface Column {
  name: string;
  display: string;
  value ?: (m: Moneta) => string;
  footer ?: () => string;
  paddingRight ? : boolean;
}
