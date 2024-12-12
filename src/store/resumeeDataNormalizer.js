export const normalizeResumeePayload = (data) => {
    const normalizedData = {
        resumees: [],
        author: {},
        expertise: [],
        expertiseItems: [],
        certifications: [],
        educations: [],
        experiences: [],
        skills: [],
    };

    // Normalize each resumee
    data.forEach((resumee) => {
        const {
            normalizedResumee,
            normalizedAuthors,
            normalizedExpertise,
            normalizedExpertiseItems,
            normalizedCertifications,
            normalizedEducations,
            normalizedExperiences,
            normalizedSkills,
        } = normalizeElement(resumee);

        // Add normalized data to the respective arrays
        normalizedData.resumees.push(normalizedResumee);

        // Merge authors to avoid duplicates
        Object.assign(normalizedData.author, normalizedAuthors);

        // Spread normalized arrays
        normalizedData.expertise.push(...normalizedExpertise);
        normalizedData.expertiseItems.push(...normalizedExpertiseItems);
        normalizedData.certifications.push(...normalizedCertifications);
        normalizedData.educations.push(...normalizedEducations);
        normalizedData.experiences.push(...normalizedExperiences);
        normalizedData.skills.push(...normalizedSkills);
    });

    return normalizedData;
};

export const normalizeSingleResumee = (resumee) => {
    // Llama a normalizeElement para normalizar el resumee
    const {
        normalizedResumee,
        normalizedAuthors,
        normalizedExpertise,
        normalizedExpertiseItems,
        normalizedCertifications,
        normalizedEducations,
        normalizedExperiences,
        normalizedSkills,
    } = normalizeElement(resumee);

    // Estructura los datos normalizados en un solo objeto
    return {
        resumee: normalizedResumee,
        author: { ...normalizedAuthors },
        expertise: [...normalizedExpertise],
        expertiseItems: [...normalizedExpertiseItems],
        certifications: [...normalizedCertifications],
        educations: [...normalizedEducations],
        experiences: [...normalizedExperiences],
        skills: [...normalizedSkills],
    };
};

// Standalone normalization function for a single resumee
export const normalizeElement = (resumee) => {
    const normalizedResumee = {
        ...resumee,
        id: resumee.id,
        documentId: resumee.documentId,
        author: resumee.author?.id || 0,
        expertise: resumee.expertise?.map((e) => e.id) || [],
        certifications: resumee.certifications?.map((c) => c.id) || [],
        educations: resumee.educations?.map((e) => e.id) || [],
        experiences: resumee.experiences?.map((e) => e.id) || [],
        skills: resumee.skills?.map((e) => e.id) || [],
    };

    const normalizedAuthors = {
        [resumee.author.id]: { ...resumee.author },
    };

    const normalizedExpertise = resumee.expertise?.map((expertise) => ({
        ...expertise,
        resumee: resumee.id,
        expertise_items: expertise.expertise_items?.map((item) => item.id) || [],
    })) || [];

    const normalizedExpertiseItems = resumee.expertise?.flatMap((expertise) =>
        expertise.expertise_items?.map((item) => ({
            ...item,
            expertise: expertise.id,
        })) || []
    ) || [];

    const normalizedCertifications = resumee.certifications?.map((certification) => ({
        ...certification,
        resumee: resumee.id,
    })) || [];

    const normalizedEducations = resumee.educations?.map((education) => ({
        ...education,
        resumee: resumee.id,
    })) || [];

    const normalizedExperiences = resumee.experiences?.map((experience) => ({
        ...experience,
        resumee: resumee.id,
    })) || [];

    const normalizedSkills = resumee.skills?.map((skill) => ({
        ...skill,
        resumee: resumee.id,
    })) || [];

    return {
        normalizedResumee,
        normalizedAuthors,
        normalizedExpertise,
        normalizedExpertiseItems,
        normalizedCertifications,
        normalizedEducations,
        normalizedExperiences,
        normalizedSkills,
    };
};
