package org.napetrico.backend.features.companies

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
import jakarta.persistence.Table
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "companies")
class Company (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    var publicId: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,

    var companyName: String,

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    var companyType: CompanyType,

    @ElementCollection
    @CollectionTable(
        name = "company_roles",
        joinColumns = [JoinColumn(name = "company_id")],
    )
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "company_role")
    var roles: MutableSet<CompanyRole> = mutableSetOf(),

    var taxId: String,

    var phoneNumber: String,

    var email: Email,

    var country: String,

    var address: String,

    var createdAt: LocalDateTime,

    var updatedAt: LocalDateTime
)