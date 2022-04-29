import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  /**
   * 创建一个 photo
   */
  async create(createInput: Photo): Promise<void> {
    await this.photoRepository.save(createInput);
  }

  /**
   * 查询指定用户的所有 photo
   */
  async findAll(userId: number): Promise<Photo[]> {
    return await this.photoRepository.find({ where: { user: { id: userId } } });
  }

  /**
   * 更新指定photo的主体信息
   */
  async updateContent(id: number, updateContent: string): Promise<void> {
    const photo = await this.photoRepository.findOneBy({ id });
    photo.content = updateContent;
    await this.photoRepository.update(id, photo);
  }

  /**
   * 查询指定用户的所有photo并记录条数
   */
  async findAllAndCount(
    userId: number,
  ): Promise<{ photosCount: number; photos: Photo[] }> {
    const [photos, photosCount] = await this.photoRepository.findAndCount({
      where: { user: { id: userId } },
    });
    return { photos, photosCount };
  }

  /**
   * 查询指定用户的指定title的所有photo并以分页的形式返回, 默认以photo.id降序排序
   * @param userId 用户id
   * @param title 标题
   * @param offset 跳过指定数量的数据
   * @param limit 查询指定数量的数据
   * @returns Array<Photo>
   */
  async findAllPhotosAndLimit(
    userId: number,
    title: string,
    offset: number,
    limit: number,
  ): Promise<Array<Photo>> {
    // 分页查询 注释掉的写法不够优雅, 更推荐使用queryBuilder
    // return await this.photoRepository.find({
    //   where: { user: { id: userId } },
    //   skip: offset,
    //   take: limit,
    // });
    return await this.photoRepository
      .createQueryBuilder('photo') // 创建queryBuilder
      .leftJoinAndSelect('photo.user', 'user') // 左连接user
      .where('user.id = :userId', { userId }) // 连接条件
      .orderBy('photo.id', 'DESC') // 排序
      .skip(offset) // 跳过
      .take(limit) // 数量
      .setParameters({ title: title }) // 查询条件
      .getMany();
  }
}
