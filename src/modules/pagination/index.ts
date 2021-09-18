export default class Pagination<PaginationEntity> {
  constructor(
    public values: PaginationEntity[],
    public totalPages: number,
    public total: number,
  ) {}
}