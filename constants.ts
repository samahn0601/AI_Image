import { PhotoType, PhotoSpec, ProfileSpec, ClothingOption } from './types';

export const CLOTHING_OPTIONS: Record<ClothingOption, { name: string; prompt: string }> = {
  [ClothingOption.Original]: {
    name: '현재 복장 유지',
    prompt: `**Attire Instruction: Maintain the subject's original clothing.** Only make minimal adjustments for neatness if necessary. CRITICAL EXCEPTION FOR PASSPORTS: If the photo is for a passport and the original clothing is white or a very light color that could blend with the white background, you MUST digitally change it to a simple, non-white colored top (e.g., a dark blue or grey crew-neck shirt). For all other photo types, preserve the original clothing.`
  },
  [ClothingOption.Casual]: {
    name: '캐주얼 복장',
    prompt: `**Attire Instruction: Replace the subject's current attire with a simple, neat casual top.** This could be a solid-colored t-shirt, a simple sweater, or a polo shirt. The clothing should be appropriate for a clean, everyday look. Avoid logos, patterns, or distracting elements.`
  },
  [ClothingOption.Formal]: {
    name: '정장',
    prompt: `**Attire Instruction: Replace the subject's current attire with neat, professional business attire.** For a masculine appearance, use a dark-colored suit jacket, a white or light-blue dress shirt, and a tie. For a feminine appearance, use a smart blouse or a professional blazer. Ensure the new attire fits the subject's body frame and neckline naturally.`
  }
};

export const PHOTO_SPECS: Record<PhotoType, PhotoSpec> = {
  [PhotoType.Passport]: {
    name: '여권 사진 (Passport)',
    size: '3.5cm x 4.5cm',
    features: ['흰색 배경', '양쪽 귀 노출', '안경/모자 제거', '무표정', '복장 선택 가능'],
    supportsClothingOptions: true,
    prompt: `Critically edit this user-uploaded photo to meet the extremely strict regulations for a Republic of Korea passport photo. The final image dimensions MUST be equivalent to 3.5cm x 4.5cm, and the aspect ratio MUST be strictly 3.5:4.5. The retouching must be subtle and preserve the subject's core identity. Adhere to all rules without exception.
1. **Prohibited Items (MUST REMOVE):**
    - **Glasses:** Digitally and completely remove any eyeglasses, sunglasses, or colored lenses. The eyes must be fully visible with no obstruction or reflection.
    - **Headwear:** Remove any hats, caps, or headbands. Do not add them.
    - **Accessories:** Remove any accessories that cause reflections or obscure facial features, such as large earrings, necklaces, or visible piercings. The final image should be free of distracting jewelry.
2. **Background:** Change the background to a completely plain, uniform, and pure white (#FFFFFF) with absolutely no shadows or patterns.
3. **Pose & Framing:** Adjust posture to be perfectly upright. Center the face in the frame. The head must be straight, not tilted, looking directly at the camera. The distance from the top of the head to the chin should be between 3.2cm and 3.6cm within the 4.5cm height.
4. **Facial Expression & Features:** Enforce a strictly neutral, closed-mouth expression. Both ears and the full facial outline MUST be clearly visible and not obscured by hair.
5. **Regulation-Compliant Retouching:**
    - **Symmetry:** Subtly correct minor facial asymmetry for a more balanced appearance, ensuring eye levels are aligned.
    - **Skin:** Even out skin tone and remove temporary blemishes (like pimples or scratches). Reduce glare or oiliness. The retouching must look completely natural and not alter permanent features like scars or moles.
    - **Hair:** Meticulously tidy any stray hairs that disrupt the silhouette against the white background.
The output MUST be only the final, edited image file, with a strict 3.5:4.5 aspect ratio, without any text, explanation, or additional content.`,
  },
  [PhotoType.License]: {
    name: '운전면허 / 주민등록증 사진',
    size: '3.5cm x 4.5cm',
    features: ['흰색 배경', '얼굴 윤곽 노출', '자연스러운 보정', '복장 선택 가능'],
    supportsClothingOptions: true,
    prompt: `Critically edit this user-uploaded photo to meet the official regulations for a Republic of Korea driver's license and resident registration card. The final output MUST look like a real photograph taken in a professional studio, not an obvious AI-generated image. The final image dimensions MUST be equivalent to 3.5cm x 4.5cm, and the aspect ratio MUST be strictly 3.5:4.5.
1. **Background:** Change the background to a completely plain, uniform, and pure white (#FFFFFF) with no shadows or patterns.
2. **Pose & Framing:** Adjust posture to be upright and formal. Center the face in the frame, with the head straight and looking directly forward.
3. **Facial Expression & Features:** Ensure a strictly neutral expression with the mouth closed. Do not show teeth. While ears do not need to be fully exposed, the entire facial outline (from forehead to chin) must be clearly visible and not obscured by hair or shadows.
4. **Prohibited Items:**
    - **Headwear:** Remove any hats, caps, or headbands.
    - **Colored Lenses/Sunglasses:** Remove any sunglasses or colored contact lenses.
5. **Permitted Items (with adjustments):**
    - **Eyeglasses:** Regular eyeglasses are permitted. If the original photo has glasses with light reflections, digitally remove the reflections and glare from the lenses while keeping the glasses frames. The eyes must be clearly visible through the lenses. Do not remove the glasses themselves unless they are sunglasses.
    - **Accessories:** Small accessories like earrings are fine, but remove any that cause significant reflection or obscure the face.
6. **Natural, Regulation-Compliant Retouching:** The retouching must be extremely subtle and realistic to avoid rejection.
    - **Skin:** Smooth the skin texture naturally, remove temporary blemishes (like pimples), and reduce oiliness. Do not make the skin look plastic-like. Preserve natural skin texture.
    - **Hair:** Neatly tidy any stray hairs.
    - **Lighting:** Correct lighting to remove any shadows on the face and ensure even illumination.
The output MUST be only the final, edited image file, with a strict 3.5:4.5 aspect ratio, without any text, explanation, or additional content.`,
  },
  [PhotoType.Resume]: {
    name: '이력서 사진 (반명함)',
    size: '3cm x 4cm',
    features: ['자연스러운 표정/자신감 있는 미소 2종 생성', '본인 얼굴 특징 유지', '전문적인 리터칭', '복장 선택 가능'],
    supportsClothingOptions: true,
    prompts: {
      natural: `Critically EDIT this user-uploaded photo to create a professional Korean resume photo (Banmyeongham) with a **natural, confident expression**. The final image dimensions MUST be equivalent to 3cm x 4cm, and the aspect ratio MUST be strictly 3:4. The absolute highest priority is to **MAINTAIN THE SUBJECT'S ORIGINAL FACIAL IDENTITY AND FEATURES**. The goal is enhancement, not alteration. Avoid creating a result that looks significantly different from the original person.
1. **Identity Preservation:** Do NOT change the fundamental shape of the eyes, nose, mouth, or overall face structure. The final image must be clearly recognizable as the same person.
2. **Expression:** Adjust the expression to be relaxed yet confident, projecting competence and approachability. This is not a full smile, but a calm, natural look with a hint of warmth in the eyes. The mouth should be closed and relaxed. Ensure the look is professional and trustworthy.
3. **Background:** Replace the background with a professional, clean, solid color (e.g., light-to-medium cool gray or soft light blue).
4. **Pose & Gaze:** Subtly correct posture to be upright and confident. Ensure the head is straight and looking directly at the camera.
5. **Subtle, Professional Retouching:**
    - **Symmetry & Contouring:** Make only minor adjustments to facial symmetry. If contouring is applied, it must be extremely subtle to add a touch of professional definition without changing the face's natural shape.
    - **Natural Skin:** Retouch skin to remove temporary blemishes (pimples, redness) and reduce excessive shine. CRUCIALLY, preserve the natural skin texture. Do not make it look overly smooth or artificial.
    - **Hair:** Tidy stray hairs and neaten the overall hairstyle, but do not change the hair's fundamental style or color.
The output MUST be only the final, edited image file with a strict 3:4 aspect ratio.`,
      smiling: `Critically EDIT this user-uploaded photo to create a professional Korean resume photo (Banmyeongham) with a **confident, ambitious smile**. The final image dimensions MUST be equivalent to 3cm x 4cm, and the aspect ratio MUST be strictly 3:4. The absolute highest priority is to **MAINTAIN THE SUBJECT'S ORIGINAL FACIAL IDENTITY AND FEATURES**. The goal is enhancement, not alteration. Avoid creating a result that looks significantly different from the original person.
1. **Identity Preservation:** Do NOT change the fundamental shape of the eyes, nose, mouth, or overall face structure. The final image must be clearly recognizable as the same person.
2. **Expression:** Transform the expression into a **confident and engaging smile, clearly distinct from a simple neutral look**. The smile should project positivity and ambition, making the subject look proactive and friendly. A smile with teeth slightly visible is ideal, but it must look genuine and not forced. It should convey competence and a positive attitude.
3. **Background:** Replace the background with a professional, clean, solid color (e.g., light-to-medium cool gray or soft light blue).
4. **Pose & Gaze:** Subtly correct posture to be upright and confident. Ensure the head is straight and looking directly at the camera.
5. **Subtle, Professional Retouching:**
    - **Symmetry & Contouring:** Make only minor adjustments to facial symmetry. If contouring is applied, it must be extremely subtle to add a touch of professional definition withoutchanging the face's natural shape.
    - **Natural Skin:** Retouch skin to remove temporary blemishes (pimples, redness) and reduce excessive shine. CRUCIALLY, preserve the natural skin texture. Do not make it look overly smooth or artificial.
    - **Hair:** Tidy stray hairs and neaten the overall hairstyle, but do not change the hair's fundamental style or color.
The output MUST be only the final, edited image file with a strict 3:4 aspect ratio.`,
    },
  },
  [PhotoType.Profile]: {
    name: '전문 프로필 사진 (Profile)',
    size: '선택 구도 → 3가지 스타일 생성',
    features: ['4가지 전문 구도 선택', '스튜디오급 조명 & 배경', '자신감 있는 표정 연출', '성별 맞춤 스타일링'],
    styleNames: {
      classic: '클래식',
      modern: '모던',
      cinematic: '시네마틱',
    },
    options: {
      headshot: {
        name: '헤드샷 (얼굴 중심)',
        prompts: {
          classic: `Critically EDIT this user-uploaded photo into a **timeless, Classic Professional Headshot**. The goal is a clean, trustworthy, and high-end studio portrait.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the fundamental shape of the eyes, nose, mouth, or overall face structure. The result must be clearly recognizable as the same person, just professionally photographed.
**2. Framing & Composition:** The final image must be a classic headshot, framed tightly from the top of the shoulders to just above the head.
**3. Pose & Expression:** Adjust the pose to be straight and facing the camera directly. The expression should be confident yet approachable—a gentle, closed-mouth smile or a relaxed but engaged neutral look. Project trustworthiness.
**4. Lighting:** Implement soft, flattering, classic three-point studio lighting. Use a large key light (like a softbox) to create gentle, defining shadows that give shape to the face without being harsh. Ensure a catchlight in the eyes.
**5. Background:** Replace the background with a completely seamless, solid, light-to-medium gray or muted blue studio backdrop.
**6. Professional Retouching:** Perform subtle, professional-grade retouching. Even out skin tone, remove temporary blemishes (pimples, stray hairs), and reduce excessive shine. CRUCIALLY, you must preserve the natural skin texture to avoid a plastic look.
**7. Attire:** Based on the subject's apparent gender, morph their clothing into classic professional attire. For a masculine look, a dark suit jacket over a crisp white or light blue dress shirt is ideal. For a feminine look, a smart blazer or a professional blouse is appropriate.
**Output:** The final output MUST be only the edited image file, with no text or explanation.`,
          modern: `Critically EDIT this user-uploaded photo into a **sharp, Modern Professional Headshot**. The goal is a crisp, energetic, and contemporary portrait.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the fundamental shape of the eyes, nose, mouth, or overall face structure. The result must be clearly recognizable as the same person.
**2. Framing & Composition:** The final image must be a modern headshot, framed from the shoulders up, possibly with a slightly more dynamic angle or crop.
**3. Pose & Expression:** The expression should be energetic, engaging, and confident. A genuine, slight smile is ideal. The pose can be slightly angled to feel more dynamic.
**4. Lighting:** Implement crisp, clean lighting with a subtle rim light to separate the subject from the background, creating a sharp, high-quality feel. Mimic bright, natural-looking light.
**5. Background:** Replace the background with a subtly blurred, bright, minimalist office or a contemporary architectural space to add depth and context.
**6. Professional Retouching:** Perform clean and sharp retouching. Enhance detail and sharpness in the eyes and hair. CRUCIALLY, you must preserve the natural skin texture.
**7. Attire:** Based on the subject's apparent gender, morph their clothing into stylish, modern business casual attire (e.g., a sharp blazer without a tie, a stylish professional top).
**Output:** The final output MUST be only the edited image file, with no text or explanation.`,
          cinematic: `Critically EDIT this user-uploaded photo into a **powerful, Cinematic Charcoal Headshot**. The goal is a dramatic, moody, and sophisticated portrait.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the fundamental shape of the eyes, nose, mouth, or overall face structure. The result must be clearly recognizable as the same person.
**2. Framing & Composition:** The final image must be a headshot, framed from the shoulders up.
**3. Pose & Expression:** The expression should be intense and confident. A neutral but powerful gaze is preferred over a smile. The pose should feel strong and deliberate.
**4. Lighting:** Implement dramatic, high-contrast lighting (like Rembrandt or split lighting) to sculpt the facial features and create a powerful, moody atmosphere. Use strong shadows.
**5. Background:** Replace the background with a solid, deep charcoal gray or near-black backdrop for a bold, sophisticated look.
**6. Professional Retouching:** Perform high-end, polished retouching that emphasizes texture and highlights. Apply subtle cinematic color grading (e.g., slightly desaturated, cooler tones) to enhance the mood. CRUCIALLY, preserve natural skin and feature details.
**7. Attire:** Based on the subject's apparent gender, morph their clothing into a simple, dark-colored, high-quality top (like a black turtleneck or crew-neck shirt) that complements the sophisticated aesthetic.
**Output:** The final output MUST be only the edited image file, with no text or explanation.`,
        }
      },
      bustShot: {
        name: '바스트샷 (상반신 일부)',
        prompts: {
          classic: `Critically EDIT this user-uploaded photo for a **timeless, Classic Professional Bust Shot**. The goal is a traditional, trustworthy, and polished corporate portrait.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the subject's core features.
**2. Framing & Composition:** The composition must be a bust shot, framed from the mid-chest area up to just above the head.
**3. Pose & Expression:** Adjust the pose to have a slight angle to the body (a classic "quarter turn"), with the face turned towards the camera for a traditional, confident look. The expression should be warm, trustworthy, and professional, such as a soft, genuine closed-mouth smile.
**4. Lighting:** Implement classic three-point studio lighting for a clean, timeless, and evenly lit portrait with minimal harsh shadows.
**5. Background:** Replace the background with a traditional painted canvas-style backdrop in a neutral color (e.g., muted blue, warm gray).
**6. Professional Retouching:** Perform subtle, professional-grade retouching. Even out skin tone, remove temporary blemishes, and tidy hair. CRUCIALLY, preserve natural skin texture.
**7. Attire:** Based on the subject's apparent gender, morph the clothing into classic business attire (e.g., a full suit jacket, dress shirt, and tie for men; a professional blouse and blazer for women).
**Output:** The final output MUST be only the edited image file.`,
          modern: `Critically EDIT this user-uploaded photo for a **bright, Modern Professional Bust Shot**. The goal is an approachable, authentic, and contemporary portrait.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the subject's core features.
**2. Framing & Composition:** The composition must be a bust shot, framed from the mid-chest area up.
**3. Pose & Expression:** Adjust the pose to be natural and relaxed, perhaps leaning slightly forward or with a slight head tilt to engage the viewer. The expression should be approachable, friendly, and confident, featuring a genuine, open smile.
**4. Lighting:** Implement bright, airy, natural-looking light that mimics a large window, creating a fresh and modern feel with soft shadows.
**5. Background:** Replace the background with a clean, modern interior with a shallow depth of field, like a stylish workspace, cafe, or against a clean architectural element.
**6. Professional Retouching:** Perform clean and natural retouching. Enhance sharpness in the eyes. CRUCIALLY, preserve natural skin texture.
**7. Attire:** Based on the subject's apparent gender, morph the clothing into smart business casual that reflects personality (e.g., open-collar dress shirt, stylish knitwear, modern blouse).
**Output:** The final output MUST be only the edited image file.`,
          cinematic: `Critically EDIT this user-uploaded photo for a **moody, Cinematic Professional Bust Shot**. The goal is a compelling, thoughtful, and artistic portrait.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the subject's core features.
**2. Framing & Composition:** The composition must be a bust shot, framed from the mid-chest area up.
**3. Pose & Expression:** Adjust the pose to be more introspective, perhaps with the subject looking slightly off-camera or with a thoughtful, serious, and compelling expression. Do not use a smile.
**4. Lighting:** Implement dramatic low-key lighting with high contrast to create mood and sculpt the form. Focus the main light on one side of the face, letting the other fall into shadow.
**5. Background:** Replace the background with a dark, textured surface (like concrete or wood) or an out-of-focus urban night scene to enhance the cinematic feel.
**6. Professional Retouching:** Apply moody color grading (e.g., cooler tones, desaturated colors, or warm cinematic tones) to enhance the atmosphere. Emphasize texture in skin and clothing.
**7. Attire:** Based on the subject's apparent gender, morph the clothing into sophisticated, dark-colored, textured attire (e.g., a leather jacket, a textured wool sweater).
**Output:** The final output MUST be only the edited image file.`,
        }
      },
      waistUpShot: {
        name: '웨이스트업샷 (상반신)',
        prompts: {
          classic: `Critically EDIT this user-uploaded photo for a **formal, Classic Waist-Up Business Portrait**. The goal is a portrait that conveys leadership and capability.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the subject's core features.
**2. Framing & Composition:** The composition must be a waist-up shot, showing the subject from the waist to just above the head.
**3. Pose & Expression:** Adjust to a traditional business pose, such as arms lightly crossed or one hand in a pocket, conveying confidence and authority. The expression must be confident, capable, and trustworthy; a slight, knowing smile is appropriate.
**4. Lighting:** Implement even, professional studio lighting that clearly illuminates the subject and their attire.
**5. Background:** Replace with a simple, professional studio background or a non-distracting, clean, out-of-focus office setting.
**6. Professional Retouching:** Perform polished, high-end retouching appropriate for a corporate website or publication. Preserve skin texture.
**7. Attire:** Based on the subject's apparent gender, morph into a full business suit for a masculine appearance, or a professional dress or suit for a feminine appearance. Ensure the attire is impeccably neat.
**Output:** The final output MUST be only the edited image file.`,
          modern: `Critically EDIT this user-uploaded photo for a **dynamic, Modern Waist-Up Lifestyle Portrait**. The goal is to tell a story about the person's profession and personality.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the subject's core features.
**2. Framing & Composition:** The composition must be a waist-up shot.
**3. Pose & Expression:** Adjust to a dynamic and natural pose, showing movement or interaction with the environment (e.g., leaning against a wall, seated at a desk, gesturing while talking). The expression should be natural, engaging, and reflective of their personality.
**4. Lighting:** Implement natural light that feels authentic and unstaged, as if captured in the moment.
**5. Background:** Replace with an authentic work environment (e.g., creative studio, workshop, modern office) that is relevant to the subject's profession. The background should be visible but have a shallow depth of field.
**6. Professional Retouching:** Perform clean, natural retouching that enhances the authentic feel.
**7. Attire:** Based on the subject's apparent gender, morph into professional attire that is authentic to their field (e.g., creative professional wear, tech industry casual).
**Output:** The final output MUST be only the edited image file.`,
          cinematic: `Critically EDIT this user-uploaded photo for a **visionary, Cinematic Waist-Up Environmental Portrait**. The goal is a powerful, narrative-driven image.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity. Do NOT alter the subject's core features.
**2. Framing & Composition:** The composition must be a waist-up shot.
**3. Pose & Expression:** Adjust to a powerful, commanding stance within the environment. The expression should be strong, determined, and visionary—looking towards the future, not necessarily at the camera.
**4. Lighting:** Implement highly stylized, directional lighting that creates strong highlights and shadows, interacting with and motivated by the environment (e.g., light from a window, a street lamp).
**5. Background:** Replace with an impressive or meaningful location (e.g., overlooking a city from a high-rise office, in a striking architectural space) that adds to the narrative of success and ambition.
**6. Professional Retouching:** Apply cinematic color grading and high-end retouching to create a polished, film-like quality.
**7. Attire:** Based on the subject's apparent gender, morph into sharp, impeccably styled professional wear (e.g., a perfectly tailored dark suit, a high-fashion architectural blouse).
**Output:** The final output MUST be only the edited image file.`,
        }
      },
      fullBodyShot: {
        name: '전신샷 (Full Body)',
        prompts: {
          classic: `Critically EDIT this user-uploaded photo for a **formal, Classic Full Body Business Portrait**. The goal is an authoritative and polished portrait for official use.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity.
**2. Framing & Composition:** The composition must be a full-body shot, capturing the subject from head to toe with appropriate breathing room in the frame.
**3. Pose & Expression:** Adjust to a confident, professional standing pose (e.g., weight on one foot, hands gently at the side or one in a pocket). The expression must be professional and approachable.
**4. Lighting:** Implement even, balanced studio lighting that illuminates the subject clearly from head to toe.
**5. Background:** Replace with a seamless, neutral-colored (light gray, white) studio backdrop.
**6. Professional Retouching:** Perform clean, high-end retouching, paying attention to both face and clothing to ensure a flawless appearance.
**7. Attire:** Based on the subject's apparent gender, morph into a complete, well-fitted business suit (for a masculine appearance) or a professional dress/pantsuit (for a feminine appearance). Shoes must be professional and clean.
**Output:** The final output MUST be only the edited image file.`,
          modern: `Critically EDIT this user-uploaded photo for a **relaxed, Modern Full Body Environmental Portrait**. The goal is an authentic portrait that showcases personality and professional context.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity.
**2. Framing & Composition:** The composition must be a full-body shot.
**3. Pose & Expression:** Adjust to a relaxed, natural stance within a relevant environment (e.g., standing in their office, walking through a creative space). The pose should feel un-staged. The expression must be engaging and genuine.
**4. Lighting:** Implement bright, natural-looking light that appears to come from the environment (e.g., a large window, open-air shade).
**5. Background:** Replace with an authentic, aesthetically pleasing workspace (e.g., modern office, studio, campus), kept slightly out of focus to keep the subject as the hero.
**6. Professional Retouching:** Perform natural-looking retouching that enhances the scene's authenticity.
**7. Attire:** Based on the subject's apparent gender, morph into smart business casual that is appropriate for their field. The entire outfit, including shoes, should feel cohesive and modern.
**Output:** The final output MUST be only the edited image file.`,
          cinematic: `Critically EDIT this user-uploaded photo for a **dramatic, Cinematic Full Body Portrait**. The goal is a powerful, narrative image suitable for a feature story or brand campaign.
**1. Identity Preservation (ABSOLUTE PRIORITY):** You MUST maintain the subject's original facial identity.
**2. Framing & Composition:** The composition must be a full-body shot, potentially using a lower angle to enhance presence.
**3. Pose & Expression:** Adjust to a powerful, dynamic, or heroic stance. The subject should own the space. The expression must be strong, determined, or visionary.
**4. Lighting:** Implement dramatic, directional lighting that creates strong highlights and shadows, sculpting the entire figure and interacting with the background.
**5. Background:** Replace with an impressive or moody location (e.g., an empty warehouse with a single light source, a city view at dusk, a striking architectural feature) that adds to the narrative.
**6. Professional Retouching:** Apply cinematic color grading and high-end retouching for a film-like aesthetic.
**7. Attire:** Based on the subject's apparent gender, morph into impeccably styled, sharp attire (not necessarily corporate) that complements the scene's mood. The outfit should be memorable.
**Output:** The final output MUST be only the edited image file.`,
        }
      },
    },
  } as ProfileSpec,
};