export class Trip {
  constructor(
    public destination: string,
    public startDate: string,
    public endDate: string,
    public comment: string,
    public tripId?: string,
    public userId?: string
  ){}
}