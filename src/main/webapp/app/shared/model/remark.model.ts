import { Moment } from 'moment';

interface IAttachment {
  attachmentFileId: 0;
  attachmentType: string;
  fileName: string;
  id: number;
  remarkId: number;
}

export interface IRemark {
  id?: number;
  createdAt?: string | Moment | Date;
  colorCode?: string;
  title?: string;
  content?: string;
  patientId?: number;
  isUpdated?: boolean;
  attachments?: any;
  file?: File
}

export class Remark implements IRemark {
  constructor(
    public id?: number,
    public createdAt?: string | Moment | Date,
    public colorCode?: string,
    public title?: string,
    public content?: string,
    public patientId?: number,
    public isUpdated?: boolean,
    public attachments?: any,
    public file?: File
  ) { }
}
