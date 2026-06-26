package org.napetrico.backend.features.products

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
import org.napetrico.backend.common.enums.MeasurementType
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.common.values.SellingMargin
import org.napetrico.backend.features.categories.Category
import org.napetrico.backend.features.users.User
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "products")
class Product (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    var publicId: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable=false)
    var user: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable=false)
    var category: Category,

    var description: String,
    var quantity: Int = 0,

    @Enumerated(EnumType.STRING)
    var measurement: MeasurementType,

    var fixedPrice: Price? = null,
    var sellingMargin: SellingMargin? = null,
    var price: Price = Price.from(BigDecimal(0)),

    var createdAt: LocalDateTime = LocalDateTime.now(),
    var updatedAt: LocalDateTime = LocalDateTime.now(),
)