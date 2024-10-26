import healthFirst from "../healthfirst.jpeg"
import lifeCare from "../lifeCare.jpeg"
import apollo from "../apollo.jpeg"
import star from "../star.jpeg"
import hdfc from "../hdfc.png"
import max from "../maxlife.png"
import bajaj from "../bajaj.png"
import pnb from "../pnb.jpeg"
import bandhan from "../bandhan.jpeg"
import sbi from "../sbi.png"


export const companies = [
    {
        "name": "HealthFirst Insurance",
        "category": "Health Insurance",
        "image_path": healthFirst,
        "policies": [
            {
                "policy_name": "Standard Health Plan",
                "description": "Basic health insurance covering hospitalization and select outpatient treatments.",
                "type_of_room": "normal",
                "day_care_treatment": "Yes",
                "renewal_bonus": "10% annually",
                "pre_hospitalization_coverage": "Yes, 30 days",
                "post_hospitalization_coverage": "Yes, 60 days",
                "cover_amount": "500,000",
                "cashless_hospitals": "City Hospital, Green Valley Medical Center, Sunrise Clinic, Metropolitan Hospital",
                "premium_per_month": "500"
            },
            {
                "policy_name": "Premium Family Plan",
                "description": "Comprehensive coverage for families, including pre and post-hospitalization, maternity, and child care.",
                "type_of_room": "duplex room",
                "day_care_treatment": "Yes",
                "renewal_bonus": "15% annually",
                "pre_hospitalization_coverage": "Yes, 45 days",
                "post_hospitalization_coverage": "Yes, 90 days",
                "cover_amount": "1,000,000",
                "cashless_hospitals": "Metropolitan Hospital, Green Valley Medical Center, Sunrise Clinic",
                "premium_per_month": "800"
            }
        ]
    },
    {
        "name": "LifeCare Insure",
        "category": "Health Insurance",
        "image_path": lifeCare,
        "policies": [
            {
                "policy_name": "Senior Citizen Care Plan",
                "description": "Specialized health plan for senior citizens, covering critical illnesses and chronic disease management.",
                "type_of_room": "deluxe",
                "day_care_treatment": "Yes",
                "renewal_bonus": "10% annually",
                "pre_hospitalization_coverage": "Yes, 25 days",
                "post_hospitalization_coverage": "Yes, 50 days",
                "cover_amount": "400,000",
                "cashless_hospitals": "Sunrise Clinic, Metropolitan Hospital, Carewell Medical Center",
                "premium_per_month": "600"
            }
        ]
    },
    {
        "name": "Apollo Health Insurance",
        "category": "Health Insurance",
        "image_path": apollo,
        "policies": [
            {
                "policy_name": "Comprehensive Care Plan",
                "description": "All-inclusive health insurance plan with extensive coverage options.",
                "type_of_room": "normal",
                "day_care_treatment": "Yes",
                "renewal_bonus": "12% annually",
                "pre_hospitalization_coverage": "Yes, 60 days",
                "post_hospitalization_coverage": "Yes, 90 days",
                "cover_amount": "1,500,000",
                "cashless_hospitals": "Apollo Hospital, Care Hospital, Max Super Specialty Hospital",
                "premium_per_month": "950"
            },
            {
                "policy_name": "Family Health Package",
                "description": "Affordable health insurance for families with essential coverage.",
                "type_of_room": "semi-private",
                "day_care_treatment": "Yes",
                "renewal_bonus": "8% annually",
                "pre_hospitalization_coverage": "Yes, 30 days",
                "post_hospitalization_coverage": "Yes, 60 days",
                "cover_amount": "750,000",
                "cashless_hospitals": "Max Super Specialty Hospital, Fortis Hospital",
                "premium_per_month": "700"
            }
        ]
    },
    {
        "name": "Star Health",
        "category": "Health Insurance",
        "image_path": star,
        "policies": [
            {
                "policy_name": "Health Gain Plan",
                "description": "A comprehensive plan focusing on preventive care and wellness support.",
                "type_of_room": "normal",
                "day_care_treatment": "Yes",
                "renewal_bonus": "10% annually",
                "pre_hospitalization_coverage": "Yes, 40 days",
                "post_hospitalization_coverage": "Yes, 70 days",
                "cover_amount": "1,000,000",
                "cashless_hospitals": "Star Hospital, Manipal Hospital, Columbia Asia Hospital",
                "premium_per_month": "800"
            },
            {
                "policy_name": "Family Health Insurance",
                "description": "Affordable health insurance for families with essential coverage.",
                "type_of_room": "normal",
                "day_care_treatment": "Yes",
                "renewal_bonus": "5% annually",
                "pre_hospitalization_coverage": "Yes, 20 days",
                "post_hospitalization_coverage": "Yes, 30 days",
                "cover_amount": "500,000",
                "cashless_hospitals": "Manipal Hospital, Fortis Hospital",
                "premium_per_month": "600"
            }
        ]
    },
    {
        "name": "HDFC Health Insurance",
        "category": "Health Insurance",
        "image_path": hdfc,
        "policies": [
            {
                "policy_name": "HDFC Health Assure",
                "description": "Flexible health insurance plan with wide coverage and additional benefits.",
                "type_of_room": "deluxe",
                "day_care_treatment": "Yes",
                "renewal_bonus": "12% annually",
                "pre_hospitalization_coverage": "Yes, 30 days",
                "post_hospitalization_coverage": "Yes, 60 days",
                "cover_amount": "1,200,000",
                "cashless_hospitals": "HDFC Hospital, Care Hospital, Fortis Hospital",
                "premium_per_month": "850"
            }
        ]
    },
    {
        "name": "Max Life",
        "category": "Life Insurance",
        "image_path": max,
        "policies": [
            {
                "policy_name": "Max Lifetime Plus",
                "description": "Comprehensive life cover with flexible term options and premium benefits.",
                "life_cover": "1,200,000",
                "coverage_till_age": "75 years",
                "claim_settled": "98.7%",
                "premium_per_month": "550"
            },
            {
                "policy_name": "Max Secure Future",
                "description": "Affordable plan focusing on financial security for families with moderate coverage.",
                "life_cover": "600,000",
                "coverage_till_age": "65 years",
                "claim_settled": "97.9%",
                "premium_per_month": "400"
            }
        ]
    },
    {
        "name": "Bajaj Allianz",
        "category": "Life Insurance",
        "image_path": bajaj,
        "policies": [
            {
                "policy_name": "Bajaj Wealth Assure",
                "description": "High life cover with investment-linked benefits and claim support.",
                "life_cover": "1,500,000",
                "coverage_till_age": "70 years",
                "claim_settled": "98.2%",
                "premium_per_month": "650"
            },
            {
                "policy_name": "Bajaj Family Guard",
                "description": "Affordable life insurance plan for families, ensuring financial stability.",
                "life_cover": "500,000",
                "coverage_till_age": "60 years",
                "claim_settled": "96.8%",
                "premium_per_month": "300"
            }
        ]
    },
    {
        "name": "PNB MetLife",
        "category": "Life Insurance",
        "image_path": pnb,
        "policies": [
            {
                "policy_name": "MetLife Premier Protect",
                "description": "Comprehensive protection plan with high life cover till advanced age.",
                "life_cover": "1,800,000",
                "coverage_till_age": "80 years",
                "claim_settled": "99.3%",
                "premium_per_month": "700"
            },
            {
                "policy_name": "MetLife Family Assure",
                "description": "Plan focusing on family support with moderate life cover and affordable premiums.",
                "life_cover": "600,000",
                "coverage_till_age": "65 years",
                "claim_settled": "97.4%",
                "premium_per_month": "400"
            }
        ]
    },
    {
        "name": "Bandhan Life",
        "category": "Life Insurance",
        "image_path": bandhan,
        "policies": [
            {
                "policy_name": "Bandhan Life Secure",
                "description": "Long-term life insurance with guaranteed claim settlement support.",
                "life_cover": "1,000,000",
                "coverage_till_age": "70 years",
                "claim_settled": "98.9%",
                "premium_per_month": "500"
            },
            {
                "policy_name": "Bandhan Family Care",
                "description": "Plan with affordable premiums focused on providing life cover for families.",
                "life_cover": "400,000",
                "coverage_till_age": "60 years",
                "claim_settled": "96.5%",
                "premium_per_month": "250"
            }
        ]
    },
    {
        "name": "SBI Life",
        "category": "Life Insurance",
        "image_path": sbi,
        "policies": [
            {
                "policy_name": "SBI Life Smart Shield",
                "description": "A plan offering protection against life's uncertainties with life cover benefits.",
                "life_cover": "1,300,000",
                "coverage_till_age": "75 years",
                "claim_settled": "97.5%",
                "premium_per_month": "600"
            },
            {
                "policy_name": "SBI Life Saral Shield",
                "description": "Affordable term insurance plan with easy claim settlement process.",
                "life_cover": "500,000",
                "coverage_till_age": "60 years",
                "claim_settled": "96.2%",
                "premium_per_month": "350"
            }
        ]
    }
]


// Group companies by category
const groupedCompanies: Record<string, any[]> = companies.reduce((acc: Record<string, any[]>, company) => {
    const { category } = company;
    if (!acc[category]) {
        acc[category] = [];
    }
    acc[category].push(company);
    return acc;
}, {});

// Example: Access grouped data
export const healthInsuranceCompanies = groupedCompanies["Health Insurance"];
export const lifeInsuranceCompanies = groupedCompanies["Life Insurance"];

// Logging to check the structure
console.log("Grouped Companies by Category:", groupedCompanies);
console.log("Health Insurance Companies:", healthInsuranceCompanies);
console.log("Life Insurance Companies:", lifeInsuranceCompanies);
