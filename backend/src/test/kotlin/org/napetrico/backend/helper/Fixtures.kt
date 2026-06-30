package org.napetrico.backend.helper

import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.enums.MeasurementType
import org.napetrico.backend.common.enums.OrderType
import org.napetrico.backend.common.values.Email
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.common.values.SellingMargin
import org.napetrico.backend.features.categories.Category
import org.napetrico.backend.features.companies.Company
import org.napetrico.backend.features.materials.Material
import org.napetrico.backend.features.movements.Movement
import org.napetrico.backend.features.orders.Order
import org.napetrico.backend.features.productMaterials.ProductMaterial
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User
import java.math.BigDecimal
import java.time.LocalDateTime

object Fixtures {
    fun userFixture(companyName: String = "", taxId: String = "", email: String = "a@a.a"): User = User(
        password = "",
        companyName = companyName,
        companyType = CompanyType.LIMITED_LIABILITY_COMPANY,
        taxId = taxId,
        phoneNumber = "",
        email = Email(email),
        country = "",
        address = "",
        createdAt = LocalDateTime.now(),
        updatedAt = LocalDateTime.now(),
    )

    fun categoryFixture(
        id: Long = 0,
        name: String = "",
        type: CategoryType = CategoryType.MATERIAL,
        user: User = userFixture()
    ): Category = Category(
        id = id,
        user = user,
        name = name,
        colorHex = "FFFFFF",
        type = type,
    )

    fun productFixture(
        id: Long = 0,
        description: String = "",
        category: Category = categoryFixture(),
        quantity: Int = 1,
        fixedPrice: Price? = null,
        sellingMargin: SellingMargin? = null,
        price: Price = Price.from(BigDecimal(0)),
        user: User = userFixture()
    ): Product = Product(
        id = id,
        user = user,
        category = category,
        description = description,
        quantity = quantity,
        measurement = MeasurementType.BAG,
        fixedPrice = fixedPrice,
        sellingMargin = sellingMargin,
        price = price,
    )

    fun companyFixture(
        id: Long = 0,
        companyName: String = "",
        companyType: CompanyType = CompanyType.LIMITED_LIABILITY_COMPANY,
        roles: Set<CompanyRole> = setOf(CompanyRole.SUPPLIER),
        taxId: String = "",
        phoneNumber: String = "",
        email: Email = Email("a@a.a"),
        country: String = "",
        address: String = "",
        user: User = userFixture()
    ): Company = Company(
        id = id,
        user = user,
        companyName = companyName,
        companyType = companyType,
        roles = roles.toMutableSet(),
        taxId = taxId,
        phoneNumber = phoneNumber,
        email = email,
        country = country,
        address = address,
        createdAt = LocalDateTime.now(),
        updatedAt = LocalDateTime.now()
    )

    fun materialFixture(
        id: Long = 0,
        description: String = "",
        category: Category = categoryFixture(),
        quantity: Int = 1,
        unitPrice: Price = Price.from("1"),
        measurement: MeasurementType = MeasurementType.BAG,
        user: User = userFixture()
    ): Material = Material(
        id = id,
        user = user,
        description = description,
        quantity = quantity,
        category = category,
        measurement = measurement,
        unitPrice = unitPrice,
    )

    fun productMaterialFixture(
        id: Long = 0,
        user: User = userFixture(),
        product: Product = productFixture(),
        material: Material, //TODO() Fixtures.materialFixture()
        quantity: Int = 1,
    ): ProductMaterial = ProductMaterial(
        id = id,
        user = user,
        product = product,
        material = material,
        quantity = quantity,
    )

    fun orderFixture(
        id: Long = 0,
        user: User = userFixture(),
        company: Company = companyFixture(),
        type: OrderType = OrderType.INBOUND,
        movements: List<Movement> = listOf(),
    ): Order = Order(
        id = id,
        user = user,
        company = company,
        type = type,
        movements = movements.toMutableSet(),
    )

    fun movementFixture(
        id: Long = 0,
        user: User = userFixture(),
        order: Order = orderFixture(),
        product: Product? = productFixture(),
        material: Material? = materialFixture(),
        quantity: Int = 1,
        notes: String? = null,
    ): Movement = Movement(
        id = id,
        user = user,
        order = order,
        product = product,
        material = material,
        quantity = quantity,
        notes = notes,
    )
}