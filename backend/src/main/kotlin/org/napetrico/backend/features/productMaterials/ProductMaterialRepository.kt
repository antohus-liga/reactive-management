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
    fun getAllByProductAndUserOrderByUpdatedAt(product: Product, user: User): List<ProductMaterial>?
    fun getAllByProductAndUserOrderByCreatedAt(product: Product, user: User): List<ProductMaterial>?
    fun existsByProductAndUser(product: Product, user: User): Boolean
}