export const normalizeResumeePayload = (data) => {

    const normalizedData = {
        resumees: [],
        authors: {},
        expertise: [],
        expertiseItems: [],
        certifications: [],
        educations: [],
        experiences: [],
    };

    data.forEach(resumee => {


        // Normalización de resumee
        normalizedData.resumees.push({
            ...resumee,
            id: resumee.id,
            documentId: resumee.documentId,
            author: resumee.author.id,
            expertise: resumee.expertise?.map(e => e.id) || [],
            certifications: resumee.certifications?.map(c => c.id) || [],
            educations: resumee.educations?.map(e => e.id) || [],
            experiences: resumee.experiences?.map(e => e.id) || [],
        });

        // Normalización de author
        if (!normalizedData.authors[resumee.author.id]) {
            normalizedData.authors[resumee.author.id] = resumee.author;
        }

        // // Normalización de expertise
        // resumee.expertise.forEach(expertise => {
        //   normalizedData.expertise.push({
        //     ...expertise,
        //     resumee: resumee.id,
        //     expertise_items: expertise.expertise_items.map(item => item.id),
        //   });

        //   // Normalización de expertise_items
        //   expertise.expertise_items.forEach(item => {
        //     normalizedData.expertiseItems.push({
        //       ...item,
        //       expertise: expertise.id,
        //     });
        //   });
        // });

        // // Normalización de certifications
        // resumee.certifications.forEach(certification => {
        //   normalizedData.certifications.push({
        //     ...certification,
        //     resumee: resumee.id,
        //   });
        // });

        // // Normalización de educations
        // resumee.educations.forEach(education => {
        //   normalizedData.educations.push({
        //     ...education,
        //     resumee: resumee.id,
        //   });
        // });

        // // Normalización de experiences
        // resumee.experiences.forEach(experience => {
        //   normalizedData.experiences.push({
        //     ...experience,
        //     resumee: resumee.id,
        //   });
        // });
    });
    
    return normalizedData;
};