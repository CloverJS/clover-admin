
/**
 * 这是一个创建用户的DTO
 * 但不必重新定义一个类, CreateUserDto实际上是User的一个变体, 对于新增用户,完全可以使用User替代CreateUserDto
 * 但是对于更新用户, 这些属性往往不是全部必填, 而是全部可选, 这时可以使用映射来快速生成新类型
 */
//TODO 创建CreateUserDto
 export class CreateUserDto {
   
 }
