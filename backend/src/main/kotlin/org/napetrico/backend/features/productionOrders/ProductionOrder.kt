package org.napetrico.backend.features.productionOrders

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import org.napetrico.backend.common.enums.ProductionStatus
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "production_orders")
class ProductionOrder (

    @Id
    @GeneratedValue(GenerationType.IDENTITY)
    val id: Long = 0,

    val publicId: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    val product: Product,

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    val status: ProductionStatus,

    val quantity: Int,
    val notes: String? = null,

    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now(),
)