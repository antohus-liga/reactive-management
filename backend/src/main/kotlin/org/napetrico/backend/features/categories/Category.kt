package org.napetrico.backend.features.categories

import jakarta.persistence.CollectionTable
import jakarta.persistence.Column
import jakarta.persistence.ElementCollection
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.features.materials.Material
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "categories")
class Category (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    var publicId: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,

    var name: String,
    var colorHex: String,

    @ElementCollection
    @CollectionTable(
        name = "category_types",
        joinColumns = [JoinColumn(name = "category_id")],
    )
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "category_type")
    var types: MutableSet<CategoryType> = mutableSetOf(),

    var createdAt: LocalDateTime = LocalDateTime.now(),
    var updatedAt: LocalDateTime = LocalDateTime.now(),

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    var products: MutableSet<Product> = mutableSetOf(),

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    var materials: MutableSet<Material> = mutableSetOf()
)