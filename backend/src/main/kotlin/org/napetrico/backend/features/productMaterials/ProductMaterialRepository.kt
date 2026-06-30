package org.napetrico.backend.features.productMaterials

import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.math.BigDecimal

interface ProductMaterialRepository : JpaRepository<ProductMaterial, Long> {
    @Query(
        """
        select coalesce(sum(pm.quantity * m.unitPrice), 0)
        from ProductMaterial pm
        join pm.material m
        join pm.product p
        where p.id = :productId
          and p.user.id = :userId
    """
    )
    fun getTotalCostByProductAndUser(productId: Long, userId: Long): BigDecimal?

    @Query(
        """
    select pm
    from ProductMaterial pm
    join fetch pm.material
    where pm.product = :product
      and pm.user = :user
    """
    )
    fun findRecipeByProductAndUser(
        product: Product,
        user: User
    ): List<ProductMaterial>

    fun getAllByProductAndUserOrderByCreatedAt(product: Product, user: User): List<ProductMaterial>
    fun deleteByProductAndUser(product: Product, user: User)
}